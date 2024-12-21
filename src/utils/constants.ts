import _ from "lodash";
import { SlotType } from "../types/slot";

export const SIZE_N = 9;
export const SIZE_BOARD = SIZE_N * SIZE_N;

export const REGION_COLORS = _.sortBy([
  // "bg-red-200 dark:bg-red-300 text-red-950 dark:text-red-950 border-red-600 dark:border-red-500",
  "bg-orange-200 dark:bg-orange-300 text-orange-950 dark:text-orange-950 border-orange-900 dark:border-orange-500",
  "bg-amber-200 dark:bg-amber-300 text-amber-950 dark:text-amber-950 border-amber-900 dark:border-amber-500",
  // "bg-yellow-200 dark:bg-yellow-300 text-yellow-950 dark:text-yellow-950 border-yellow-900 dark:border-yellow-500",
  "bg-lime-200 dark:bg-lime-300 text-lime-950 dark:text-lime-950 border-lime-900 dark:border-lime-500",
  "bg-green-200 dark:bg-green-300 text-green-950 dark:text-green-950 border-green-900 dark:border-green-500",
  "bg-emerald-200 dark:bg-emerald-300 text-emerald-950 dark:text-emerald-950 border-emerald-900 dark:border-emerald-500",
  // "bg-teal-200 dark:bg-teal-300 text-teal-950 dark:text-teal-950 border-teal-900 dark:border-teal-500",
  "bg-cyan-200 dark:bg-cyan-300 text-cyan-950 dark:text-cyan-950 border-cyan-900 dark:border-cyan-500",
  "bg-sky-200 dark:bg-sky-300 text-sky-950 dark:text-sky-950 border-sky-900 dark:border-sky-500",
  "bg-blue-200 dark:bg-blue-300 text-blue-950 dark:text-blue-950 border-blue-900 dark:border-blue-500",
  "bg-indigo-200 dark:bg-indigo-300 text-indigo-950 dark:text-indigo-950 border-indigo-900 dark:border-indigo-500",
  "bg-violet-200 dark:bg-violet-300 text-violet-950 dark:text-violet-950 border-violet-900 dark:border-violet-500",
  "bg-purple-200 dark:bg-purple-300 text-purple-950 dark:text-purple-950 border-purple-900 dark:border-purple-500",
  "bg-fuchsia-200 dark:bg-fuchsia-300 text-fuchsia-950 dark:text-fuchsia-950 border-fuchsia-900 dark:border-fuchsia-500",
  "bg-pink-200 dark:bg-pink-300 text-pink-950 dark:text-pink-950 border-pink-900 dark:border-pink-500",
  "bg-rose-200 dark:bg-rose-300 text-rose-950 dark:text-rose-950 border-rose-900 dark:border-rose-500",
]);

export type ExampleConfigType = { [index: number]: Partial<SlotType> };

const getExampleGrid = (
  baseConfig: ExampleConfigType,
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

    return slot;
  });
};

export const DEFAULT_REGION_BORDER = {
  top: false,
  right: false,
  bottom: false,
  left: false,
};

export const DEFAULT_SLOT: SlotType = {
  index: 0,
  isQueen: false,
  isCrossed: false,
  isConflicted: false,
  region: 0,
  regionBorder: DEFAULT_REGION_BORDER,
};

const BASE_EXAMPLE_CONFIG: ExampleConfigType = {
  0: { region: 1 },
  1: { region: 2 },
  2: { region: 2 },
  3: { region: 2 },
  4: { region: 2 },

  5: { region: 3 },
  6: { region: 4 },
  7: { region: 3 },
  8: { region: 5 },
  9: { region: 3 },

  10: { region: 3 },
  11: { region: 4 },
  12: { region: 3 },
  13: { region: 3 },
  14: { region: 3 },

  15: { region: 3 },
  16: { region: 3 },
  17: { region: 3 },
  18: { region: 6 },
  19: { region: 6 },

  20: { region: 3 },
  21: { region: 3 },
  22: { region: 3 },
  23: { region: 3 },
  24: { region: 3 },
};

const EACH_ROW_EXAMPLE_CONFIG: ExampleConfigType = {
  0: { isQueen: true },
  1: { isCrossed: true },
  2: { isCrossed: true },
  3: { isCrossed: true },
  4: { isCrossed: true },
};

export const EACH_COLUMN_EXAMPLE_CONFIG: ExampleConfigType = {
  0: { isQueen: true },
  5: { isCrossed: true },
  10: { isCrossed: true },
  15: { isCrossed: true },
  20: { isCrossed: true },
};

export const EACH_COLOR_REGION_EXAMPLE_CONFIG: ExampleConfigType = {
  13: { isQueen: true, isConflicted: true },
  22: { isQueen: true, isConflicted: true },
};

export const QUEENS_TOUCHING_EXAMPLE_CONFIG: ExampleConfigType = {
  8: { isQueen: true, isCrossed: true },
  12: { isQueen: true, isCrossed: true },
};

export const EACH_ROW_EXAMPLE = getExampleGrid(
  BASE_EXAMPLE_CONFIG,
  EACH_ROW_EXAMPLE_CONFIG
);

export const EACH_COLUMN_EXAMPLE = getExampleGrid(
  BASE_EXAMPLE_CONFIG,
  EACH_COLUMN_EXAMPLE_CONFIG
);

export const EACH_COLOR_REGION_EXAMPLE = getExampleGrid(
  BASE_EXAMPLE_CONFIG,
  EACH_COLOR_REGION_EXAMPLE_CONFIG
);

export const QUEENS_TOUCHING_EXAMPLE = getExampleGrid(
  BASE_EXAMPLE_CONFIG,
  QUEENS_TOUCHING_EXAMPLE_CONFIG
);
