import _ from "lodash";

import { SlotType } from "../types/slot";
import { SIZE_N, SIZE_BOARD } from "./constants";

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

    const { top, right, bottom, left } = getFourDirectionsIndicesDictionary(
      slot.index
    );

    if (top !== undefined) {
      slot.regionBorder.top = region !== slots[top].region;
      slots[top].regionBorder.bottom = slot.regionBorder.top;
    }

    if (right !== undefined) {
      slot.regionBorder.right = region !== slots[right].region;
      slots[right].regionBorder.left = slot.regionBorder.right;
    }

    if (bottom !== undefined) {
      slot.regionBorder.bottom = region !== slots[bottom].region;
      slots[bottom].regionBorder.top = slot.regionBorder.bottom;
    }

    if (left !== undefined) {
      slot.regionBorder.left = region !== slots[left].region;
      slots[left].regionBorder.right = slot.regionBorder.left;
    }

    const remainingSlots = _.difference(unregionedSlots, [slot]);
    unregionedSlots = remainingSlots;
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

export const getFourDirectionsIndicesDictionary = (a: number) => {
  const previousRow = Math.floor(a / SIZE_N) - 1;
  const currentRow = Math.floor(a / SIZE_N);
  const nextRow = Math.floor(a / SIZE_N) + 1;

  const upIndex = a - SIZE_N;
  const downIndex = a + SIZE_N;
  const leftIndex = a - 1;
  const rightIndex = a + 1;

  const touchingIndices = {
    top:
      _.inRange(upIndex, previousRow * SIZE_N, (previousRow + 1) * SIZE_N) &&
      _.inRange(upIndex, 0, SIZE_BOARD)
        ? upIndex
        : undefined,
    bottom:
      _.inRange(downIndex, nextRow * SIZE_N, (nextRow + 1) * SIZE_N) &&
      _.inRange(downIndex, 0, SIZE_BOARD)
        ? downIndex
        : undefined,
    left:
      _.inRange(leftIndex, currentRow * SIZE_N, (currentRow + 1) * SIZE_N) &&
      _.inRange(leftIndex, 0, SIZE_BOARD)
        ? leftIndex
        : undefined,
    right:
      _.inRange(rightIndex, currentRow * SIZE_N, (currentRow + 1) * SIZE_N) &&
      _.inRange(rightIndex, 0, SIZE_BOARD)
        ? rightIndex
        : undefined,
  };

  return touchingIndices;
};
