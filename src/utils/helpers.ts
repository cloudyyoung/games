import _ from "lodash";

import { SlotType } from "../types/slot";
import { BaseExampleConfigType, ExampleConfigType } from "../types/examples";
import {
  SIZE_N,
  SIZE_BOARD,
  DEFAULT_SLOT,
  EXAMPLE_SIZE_N,
  DEFAULT_REGION_BORDER,
} from "./constants";

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
    regionBorder: DEFAULT_REGION_BORDER,
  }));

  const queens = [];

  let indices = Array.from({ length: SIZE_BOARD }, (_, i) => i);
  while (indices.length > 0) {
    const { queen, remainingIndices } = pickQueenSlot(indices);
    queens.push(queen);
    indices = remainingIndices;
  }

  queens.forEach((queen, i) => {
    // slots[queen].isQueen = true;
    slots[queen].region = i + 2;
    slots[queen].regionBorder = DEFAULT_REGION_BORDER;

    const touchingIndices = getFourDirectionsIndices(queen);
    const touchingSlots = touchingIndices
      .map((index) => slots[index])
      .filter((slot) => slot.region === 0 && slot.isQueen === false);
    const convertSlot = _.sample(touchingSlots) as SlotType;
    convertSlot.region = i + 2;
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

  const regionSatisfied =
    Object.values(regionsQueens).every((queens) => queens.length === 1) &&
    numberOfRegions === numberOfAllocatedRegions;

  const conflictSatisfied = _.every(
    slots,
    (slot) => !((slot.isConflicted || slot.isCrossed) && slot.isQueen)
  );

  return regionSatisfied && conflictSatisfied;
};

export const getSameRowIndices = (a: number) => {
  const row = Math.floor(a / SIZE_N);
  return Array.from({ length: SIZE_N }, (_, i) => row * SIZE_N + i);
};

export const getSameColumnIndices = (a: number) => {
  const column = a % SIZE_N;
  return Array.from({ length: SIZE_N }, (_, i) => i * SIZE_N + column);
};

export const getTouchingIndices = (a: number, n: number = SIZE_N) => {
  const dic = getTouchingIndicesDictionary(a, n);
  return _.values(dic).filter((index) => index !== undefined) as number[];
};

export const getTouchingIndicesDictionary = (a: number, n: number = SIZE_N) => {
  const previousRow = Math.floor(a / n) - 1;
  const currentRow = Math.floor(a / n);
  const nextRow = Math.floor(a / n) + 1;

  const topLeftIndex = a - n - 1;
  const topIndex = a - n;
  const topRightIndex = a - n + 1;
  const leftIndex = a - 1;
  const rightIndex = a + 1;
  const bottomLeftIndex = a + n - 1;
  const bottomIndex = a + n;
  const bottomRightIndex = a + n + 1;

  const touchingIndices = {
    topLeft:
      _.inRange(topLeftIndex, previousRow * n, (previousRow + 1) * n) &&
      _.inRange(topLeftIndex, 0, n * n)
        ? topLeftIndex
        : undefined,
    top:
      _.inRange(topIndex, previousRow * n, (previousRow + 1) * n) &&
      _.inRange(topIndex, 0, n * n)
        ? topIndex
        : undefined,
    topRight:
      _.inRange(topRightIndex, previousRow * n, (previousRow + 1) * n) &&
      _.inRange(topRightIndex, 0, n * n)
        ? topRightIndex
        : undefined,
    left:
      _.inRange(leftIndex, currentRow * n, (currentRow + 1) * n) &&
      _.inRange(leftIndex, 0, n * n)
        ? leftIndex
        : undefined,
    right:
      _.inRange(rightIndex, currentRow * n, (currentRow + 1) * n) &&
      _.inRange(rightIndex, 0, n * n)
        ? rightIndex
        : undefined,

    bottomLeft:
      _.inRange(bottomLeftIndex, nextRow * n, (nextRow + 1) * n) &&
      _.inRange(bottomLeftIndex, 0, n * n)
        ? bottomLeftIndex
        : undefined,
    bottom:
      _.inRange(bottomIndex, nextRow * n, (nextRow + 1) * n) &&
      _.inRange(bottomIndex, 0, n * n)
        ? bottomIndex
        : undefined,
    bottomRight:
      _.inRange(bottomRightIndex, nextRow * n, (nextRow + 1) * n) &&
      _.inRange(bottomRightIndex, 0, n * n)
        ? bottomRightIndex
        : undefined,
  };

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
  const {
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight,
  } = getTouchingIndicesDictionary(slot.index, n);

  const regionBorder = {
    topLeft: topLeft !== undefined && slot.region !== slots[topLeft].region,
    topRight: topRight !== undefined && slot.region !== slots[topRight].region,
    bottomLeft:
      bottomLeft !== undefined && slot.region !== slots[bottomLeft].region,
    bottomRight:
      bottomRight !== undefined && slot.region !== slots[bottomRight].region,
    top: top !== undefined && slot.region !== slots[top].region,
    right: right !== undefined && slot.region !== slots[right].region,
    bottom: bottom !== undefined && slot.region !== slots[bottom].region,
    left: left !== undefined && slot.region !== slots[left].region,
  };

  const topLeftSlot = topLeft !== undefined ? slots[topLeft] : undefined;
  const topRightSlot = topRight !== undefined ? slots[topRight] : undefined;
  const bottomLeftSlot =
    bottomLeft !== undefined ? slots[bottomLeft] : undefined;
  const bottomRightSlot =
    bottomRight !== undefined ? slots[bottomRight] : undefined;

  if (topLeftSlot) {
    topLeftSlot.regionBorder.bottomRight = slot.region !== topLeftSlot.region;
  }

  if (topRightSlot) {
    topRightSlot.regionBorder.bottomLeft = slot.region !== topRightSlot.region;
  }

  if (bottomLeftSlot) {
    bottomLeftSlot.regionBorder.topRight =
      slot.region !== bottomLeftSlot.region;
  }

  if (bottomRightSlot) {
    bottomRightSlot.regionBorder.topLeft =
      slot.region !== bottomRightSlot.region;
  }

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
