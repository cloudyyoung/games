import { BaseExampleConfigType, ExampleConfigType } from "../types/examples";
import { DEFAULT_REGION_BORDER } from "./constants";
import { getExampleGrid } from "./helpers";

const BASE_EXAMPLE_CONFIG: BaseExampleConfigType = {
  0: { region: 1, regionBorder: DEFAULT_REGION_BORDER },
  1: { region: 2, regionBorder: DEFAULT_REGION_BORDER },
  2: { region: 2, regionBorder: DEFAULT_REGION_BORDER },
  3: { region: 2, regionBorder: DEFAULT_REGION_BORDER },
  4: { region: 2, regionBorder: DEFAULT_REGION_BORDER },

  5: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  6: { region: 4, regionBorder: DEFAULT_REGION_BORDER },
  7: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  8: { region: 5, regionBorder: DEFAULT_REGION_BORDER },
  9: { region: 3, regionBorder: DEFAULT_REGION_BORDER },

  10: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  11: { region: 4, regionBorder: DEFAULT_REGION_BORDER },
  12: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  13: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  14: { region: 3, regionBorder: DEFAULT_REGION_BORDER },

  15: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  16: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  17: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  18: { region: 6, regionBorder: DEFAULT_REGION_BORDER },
  19: { region: 6, regionBorder: DEFAULT_REGION_BORDER },

  20: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  21: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  22: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  23: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
  24: { region: 3, regionBorder: DEFAULT_REGION_BORDER },
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
  5: { isCrossed: true },
  7: { isCrossed: true },
  9: { isCrossed: true },
  10: { isCrossed: true },
  12: { isCrossed: true },
  13: { isQueen: true, isConflicted: true },
  14: { isCrossed: true },
  15: { isCrossed: true },
  16: { isCrossed: true },
  17: { isCrossed: true },
  20: { isCrossed: true },
  21: { isCrossed: true },
  22: { isQueen: true, isConflicted: true },
  23: { isCrossed: true },
  24: { isCrossed: true },
};

export const QUEENS_TOUCHING_EXAMPLE_CONFIG: ExampleConfigType = {
  2: { isCrossed: true },
  3: { isCrossed: true },
  4: { isCrossed: true },
  6: { isCrossed: true },
  7: { isCrossed: true },
  8: { isQueen: true, isCrossed: true },
  9: { isCrossed: true },
  11: { isCrossed: true },
  12: { isQueen: true, isCrossed: true },
  13: { isCrossed: true },
  14: { isCrossed: true },
  16: { isCrossed: true },
  17: { isCrossed: true },
  18: { isCrossed: true },
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
