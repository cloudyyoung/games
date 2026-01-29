import clsx from "clsx"

import type { SlotType } from "../types/slot"
import { REGION_COLORS } from "../utils/constants"

export interface SlotProps extends SlotType {
  disabled?: boolean
  satisfied?: boolean
  showCrossed?: boolean
  onClick?: () => void
}

export const Slot = ({ isQueen, isCrossed, isConflicted, region, disabled, satisfied, regionBorder, showCrossed = true, onClick }: SlotProps) => {
  let icon = null

  if (isQueen) {
    icon = 'crown'
  } else if (isCrossed) {
    icon = 'close'
  }

  const regionColor = REGION_COLORS[region - 1]
  const showIcon = isQueen || (isCrossed && showCrossed)
  const showPing = isQueen && satisfied

  return (
    <div
      className={clsx(
        "aspect-square outline outline-[1px] -outline-offset-[0.5px] box-border flex justify-center items-center relative",
        regionColor,
        onClick && 'cursor-pointer',
        disabled && 'pointer-events-none',
      )}
      onClick={onClick}
    >
      <span className={clsx(
        'material-symbols-sharp relative flex',
        (!isQueen && isCrossed) && 'opacity-70 text-lg sm:text-2xl',
        (isQueen && isCrossed) && 'text-red-600 dark:text-red-600',
        (isQueen && isConflicted) && 'text-red-600 dark:text-red-600',
        isQueen && 'text-2xl sm:text-4xl',
      )}>
        {showPing && <div className="absolute inline-flex animate-ping opacity-40">{icon}</div>}
        {showIcon && <div className="z-10">{icon}</div>}
      </span>


      <div className={clsx(
        "absolute -relative top-0 bottom-0 left-0 right-0 border-t-[0.1em]",
        regionColor,
        regionBorder.top ? 'border-opacity-100' : 'border-opacity-0',
        "!bg-transparent pointer-events-none",
      )}></div>


      <div className={clsx(
        "absolute -relative top-0 bottom-0 left-0 right-0 border-b-[0.1em]",
        regionColor,
        regionBorder.bottom ? 'border-opacity-100' : 'border-opacity-0',
        "!bg-transparent pointer-events-none",
      )}></div>


      <div className={clsx(
        "absolute -relative top-0 bottom-0 left-0 right-0 border-l-[0.1em]",
        regionColor,
        regionBorder.left ? 'border-opacity-100' : 'border-opacity-0',
        "!bg-transparent pointer-events-none",
      )}></div>


      <div className={clsx(
        "absolute -relative top-0 bottom-0 left-0 right-0 border-r-[0.1em]",
        regionColor,
        regionBorder.right ? 'border-opacity-100' : 'border-opacity-0',
        "!bg-transparent pointer-events-none",
      )}></div>

      <div className={clsx("absolute left-0 top-0 border-[0.05em]", regionColor, !regionBorder.topRight && 'hidden')}></div>
      <div className={clsx("absolute left-0 bottom-0 border-[0.05em]", regionColor, !regionBorder.bottomLeft && 'hidden')}></div>
      <div className={clsx("absolute right-0 top-0 border-[0.05em]", regionColor, !regionBorder.topRight && 'hidden')}></div>
      <div className={clsx("absolute right-0 bottom-0 border-[0.05em]", regionColor, !regionBorder.bottomRight && 'hidden')}></div>

    </div>
  )
}
