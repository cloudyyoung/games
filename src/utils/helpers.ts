import _ from "lodash";

import { SlotType } from "../types/slot";
import { BaseExampleConfigType, ExampleConfigType } from "../types/examples";
import { SIZE_N, SIZE_BOARD, DEFAULT_SLOT, EXAMPLE_SIZE_N } from "./constants";

export const toggleCrossed = (
  slots: SlotType[],
  index: number,
  isCrossed: boolean
) => {
  // Cross out the row
  const sameRowIndices = getSameRowIndices(index);
  sameRowIndices.forEach((sameRowIndex) => {
    if (sameRowIndex === index) return;
    slots[sameRowIndex].isCrossed = isCrossed;
  });

  // Cross out the column
  const sameColumnIndices = getSameColumnIndices(index);
  sameColumnIndices.forEach((sameColumnIndex) => {
    if (sameColumnIndex === index) return;
    slots[sameColumnIndex].isCrossed = isCrossed;
  });

  // Cross out the touching slots
  const touchingIndices = getTouchingIndices(index);
  touchingIndices.forEach((touchingIndex) => {
    if (touchingIndex === index) return;
    slots[touchingIndex].isCrossed = isCrossed;
  });
};

export const generateSlots = () => {
  const slots: SlotType[] = Array.from({ length: SIZE_BOARD }, (_, i) => ({
    index: i,
    isQueen: false,
    isCrossed: false,
    isConflicted: false,
    region: 0,
    regionBorder: { top: false, right: false, bottom: false, left: false },
  }));

  const queens = [];

  let indices = Array.from({ length: SIZE_BOARD }, (_, i) => i);
  while (indices.length > 0) {
    const { queen, remainingIndices } = pickQueenSlot(indices);
    queens.push(queen);
    indices = remainingIndices;
    if (queens.length >= 6 && _.random(1, SIZE_N) === 6) break;
  }

  queens.forEach((queen, i) => {
    // slots[queen].isQueen = true
    slots[queen].region = i + 2;
    slots[queen].regionBorder = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    };
  });

  let unregionedSlots = slots.filter((slot) => slot.region === 0);
  while (unregionedSlots.length > 0) {
    const slot = _.sample(unregionedSlots) as SlotType;
    const touchingIndices = getFourDirectionsIndices(slot.index);
    const regions = touchingIndices
      .map((touchingIndex) => slots[touchingIndex].region)
      .filter((region) => region > 0);

    if (regions.length === 0) continue;

    const region = _.max(regions) as number;
    slot.region = region;

    const remainingSlots = _.difference(unregionedSlots, [slot]);
    unregionedSlots = remainingSlots;
  }

  for (const slot of slots) {
    const regionBorder = getRegionBorder(slot, slots);
    slot.regionBorder = regionBorder;
  }

  return slots;
};

export const pickQueenSlot = (indices: number[]) => {
  if (indices.length === 0)
    throw new Error("No indices provided to pick queen");

  const queen = _.sample(indices) as number;
  const touchingIndices = getTouchingIndices(queen);
  const sameRowIndices = getSameRowIndices(queen);
  const sameColumnIndices = getSameColumnIndices(queen);
  const remainingIndices = _.difference(
    indices,
    touchingIndices,
    sameRowIndices,
    sameColumnIndices
  );
  return { queen, remainingIndices };
};

export const checkQueensSlots = (slots: SlotType[]) => {
  const regionsQueens = _.groupBy(
    slots.filter((slot) => slot.isQueen),
    "region"
  );
  for (const region in regionsQueens) {
    regionsQueens[region].forEach((slot) => {
      slot.isConflicted = regionsQueens[region].length > 1;
    });
  }

  const regions = _.groupBy(slots, "region");
  const numberOfRegions = Object.keys(regions).length;
  const numberOfAllocatedRegions = Object.keys(regionsQueens).length;

  const satisfied =
    Object.values(regionsQueens).every((queens) => queens.length === 1) &&
    numberOfRegions === numberOfAllocatedRegions;
  return satisfied;
};

export const getSameRowIndices = (a: number) => {
  const row = Math.floor(a / SIZE_N);
  return Array.from({ length: SIZE_N }, (_, i) => row * SIZE_N + i);
};

export const getSameColumnIndices = (a: number) => {
  const column = a % SIZE_N;
  return Array.from({ length: SIZE_N }, (_, i) => i * SIZE_N + column);
};

export const getTouchingIndices = (a: number) => {
  const previousRow = Math.floor(a / SIZE_N) - 1;
  const currentRow = Math.floor(a / SIZE_N);
  const nextRow = Math.floor(a / SIZE_N) + 1;

  const previousRowIndices = [
    a - (SIZE_N - 1),
    a - SIZE_N,
    a - (SIZE_N + 1),
  ].filter((index) =>
    _.inRange(index, previousRow * SIZE_N, (previousRow + 1) * SIZE_N)
  );
  const currentRowIndices = [a - 1, a, a + 1].filter((index) =>
    _.inRange(index, currentRow * SIZE_N, (currentRow + 1) * SIZE_N)
  );
  const nextRowIndices = [
    a + (SIZE_N - 1),
    a + SIZE_N,
    a + (SIZE_N + 1),
  ].filter((index) =>
    _.inRange(index, nextRow * SIZE_N, (nextRow + 1) * SIZE_N)
  );

  const touchingIndices = [
    ...previousRowIndices,
    ...currentRowIndices,
    ...nextRowIndices,
  ].filter((index) => index >= 0 && index < SIZE_BOARD);

  return touchingIndices;
};

export const getFourDirectionsIndices = (a: number) => {
  const dic = getFourDirectionsIndicesDictionary(a);
  return _.values(dic).filter((index) => index !== undefined) as number[];
};

export const getFourDirectionsIndicesDictionary = (
  a: number,
  n: number = SIZE_N
) => {
  const size_board = n * n;

  const previousRow = Math.floor(a / n) - 1;
  const currentRow = Math.floor(a / n);
  const nextRow = Math.floor(a / n) + 1;

  const upIndex = a - n;
  const downIndex = a + n;
  const leftIndex = a - 1;
  const rightIndex = a + 1;

  const touchingIndices = {
    top:
      _.inRange(upIndex, previousRow * n, (previousRow + 1) * n) &&
      _.inRange(upIndex, 0, size_board)
        ? upIndex
        : undefined,
    bottom:
      _.inRange(downIndex, nextRow * n, (nextRow + 1) * n) &&
      _.inRange(downIndex, 0, size_board)
        ? downIndex
        : undefined,
    left:
      _.inRange(leftIndex, currentRow * n, (currentRow + 1) * n) &&
      _.inRange(leftIndex, 0, size_board)
        ? leftIndex
        : undefined,
    right:
      _.inRange(rightIndex, currentRow * n, (currentRow + 1) * n) &&
      _.inRange(rightIndex, 0, size_board)
        ? rightIndex
        : undefined,
  };

  return touchingIndices;
};

export const getRegionBorder = (
  slot: SlotType,
  slots: Pick<SlotType, "region" | "regionBorder">[],
  n: number = SIZE_N
) => {
  const { top, right, bottom, left } = getFourDirectionsIndicesDictionary(
    slot.index,
    n
  );
  console.log(slots, top, right, bottom, left);

  const regionBorder = {
    top: top !== undefined && slot.region !== slots[top].region,
    right: right !== undefined && slot.region !== slots[right].region,
    bottom: bottom !== undefined && slot.region !== slots[bottom].region,
    left: left !== undefined && slot.region !== slots[left].region,
  };

  return regionBorder;
};

export const getExampleGrid = (
  baseConfig: BaseExampleConfigType,
  exampleConfig: ExampleConfigType
) => {
  return Array.from({ length: 25 }, (_, i) => {
    let slot = { ...DEFAULT_SLOT, index: i };

    if (i in baseConfig) {
      slot = { ...slot, ...baseConfig[i] };
    }

    if (i in exampleConfig) {
      slot = { ...slot, ...exampleConfig[i] };
    }

    const regionBorder = getRegionBorder(
      slot,
      Object.values(baseConfig),
      EXAMPLE_SIZE_N
    );
    slot = { ...slot, regionBorder };

    return slot;
  });
};
