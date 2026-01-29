import { SlotType } from "./slot";

export type ExampleConfigType = { [index: number]: Partial<SlotType> };
export type BaseExampleConfigType = {
  [index: number]: Pick<SlotType, "region" | "regionBorder">;
};
