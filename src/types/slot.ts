export interface SlotType {
  index: number;
  isQueen: boolean;
  isCrossed: boolean;
  isConflicted: boolean;
  region: number;
  regionBorder: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
}

export type SlotsType = SlotType[];
