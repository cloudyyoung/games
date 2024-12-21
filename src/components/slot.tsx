import clsx from "clsx"

import type { SlotType } from "../types/slot"
import { REGION_COLORS } from "../utils/constants"

export interface SlotProps extends SlotType {
  disabled?: boolean
  satisfied?: boolean
  onClick: () => void
}

export const Slot = ({ isQueen, isCrossed, isConflicted, region, disabled, satisfied, regionBorder, onClick }: SlotProps) => {
  let icon = null

  if (isQueen) {
    icon = 'crown'
  } else if (isCrossed) {
    icon = 'close'
  }

  const regionColor = REGION_COLORS[region - 1]

  return (
    <div
      className={clsx(
        "aspect-square box-border border-solid border-zinc-600 dark:border-zinc-500 border-[0.5px] flex justify-center items-center cursor-pointer relative",
        regionColor,
        regionBorder.top && 'border-t-[1.5px]',
        regionBorder.right && 'border-r-[1.5px]',
        regionBorder.bottom && 'border-b-[1.5px]',
        regionBorder.left && 'border-l-[1.5px]',
        disabled && 'pointer-events-none',
      )}
      onClick={onClick}
    >
      <span className={clsx(
        'material-symbols-sharp relative flex',
        (!isQueen && isCrossed) && 'opacity-70 text-xl',
        (isQueen && isCrossed) && 'text-red-600 dark:text-red-600',
        (isQueen && isConflicted) && 'text-red-600 dark:text-red-600',
        isQueen && 'text-3xl',
      )}>
        {isQueen && satisfied && <div className="absolute inline-flex animate-ping opacity-40">{icon}</div>}
        <div className="z-10">{icon}</div>
      </span>
    </div>
  )
}
