import clsx from "clsx"
import { useState } from "react"
import _ from "lodash"

import { Button } from "./components/button"

const SIZE_N = 9
const SIZE_BOARD = SIZE_N * SIZE_N

export const App = () => {
  const [slots, setSlots] = useState<Slot[]>(generateSlots())
  const [satisfied, setSatisfied] = useState(false)

  const onClick = (slot: Slot) => {
    const { index, isQueen: isQueenOld } = slot
    const isQueen = !isQueenOld

    slots[index].isQueen = isQueen
    toggleCrossed(slots, index, isQueen)

    for (let i = 0; i < SIZE_BOARD; i++) {
      if (slots[i].isQueen) {
        toggleCrossed(slots, i, true)
      }
    }

    const satisfied = checkQueensSlots(slots)
    setSatisfied(satisfied)

    setSlots([...slots])
  }

  const onReset = () => {
    setSlots(slots.map((slot) => ({ ...slot, isQueen: false, isCrossed: false, isConflicted: false })))
    setSatisfied(false)
  }

  const onNewGame = () => {
    setSlots(generateSlots())
    setSatisfied(false)
  }

  return (
    <>
      <div className="max-w-2xl mx-auto text-zinc-950 dark:text-white p-2 sm:p-6">
        <div className="h-fit w-full space-y-6 py-10">
          <div className="text-4xl font-extrabold text-center uppercase">Queens</div>

          <div className="bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
            <div className="p-2 sm:p-4">
              <div className="border-none border-zinc-900 dark:border-zinc-400">
                <div className={`grid gap-0`} style={{ gridTemplateColumns: `repeat(${SIZE_N}, minmax(0, 1fr)` }}>
                  {
                    slots.map((slot) => (
                      <Slot {...slot} satisfied={satisfied} onClick={() => onClick(slot)} key={slot.index} disabled={satisfied} />
                    ))
                  }
                </div>
              </div>
            </div>

          </div>


          <div className="flex justify-center space-x-4">
            {!satisfied && <Button onClick={onReset} outline>Reset</Button>}
            <Button onClick={onNewGame}>New Game</Button>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" className="row-start-3 ml-[calc(50%-50vw)] h-px w-screen" fill="none"><defs><pattern id=":S2:" patternUnits="userSpaceOnUse" width="16" height="1"><line class="stroke-zinc-950 dark:stroke-white" x1="0" x2="16" y1="0.5" y2="0.5" stroke-dasharray="2 2" stroke-width="1.5" stroke-opacity="0.1" stroke-linejoin="round"></line></pattern></defs><rect width="100%" height="100%" fill="url(#:S2:)"></rect></svg>

        </div>
      </div>
    </>
  )
}

export default App

export interface Slot {
  index: number
  isQueen: boolean
  isCrossed: boolean
  isConflicted: boolean
  region: number
  regionBorder: {
    top: boolean
    right: boolean
    bottom: boolean
    left: boolean
  }
}

export interface SlotProps extends Slot {
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

const REGION_COLORS = _.shuffle([
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
])

const toggleCrossed = (slots: Slot[], index: number, isCrossed: boolean) => {
  // Cross out the row
  const sameRowIndices = getSameRowIndices(index)
  sameRowIndices.forEach((sameRowIndex) => {
    if (sameRowIndex === index) return
    slots[sameRowIndex].isCrossed = isCrossed
  })

  // Cross out the column
  const sameColumnIndices = getSameColumnIndices(index)
  sameColumnIndices.forEach((sameColumnIndex) => {
    if (sameColumnIndex === index) return
    slots[sameColumnIndex].isCrossed = isCrossed
  })

  // Cross out the touching slots
  const touchingIndices = getTouchingIndices(index)
  touchingIndices.forEach((touchingIndex) => {
    if (touchingIndex === index) return
    slots[touchingIndex].isCrossed = isCrossed
  })
}

const generateSlots = () => {
  const slots: Slot[] = Array.from({ length: SIZE_BOARD }, (_, i) => ({
    index: i, isQueen: false, isCrossed: false, isConflicted: false, region: 0,
    regionBorder: { top: false, right: false, bottom: false, left: false },
  }))

  console.log(slots.length)
  const queens = []

  let indices = Array.from({ length: SIZE_BOARD }, (_, i) => i)
  while (indices.length > 0) {
    const { queen, remainingIndices } = pickQueenSlot(indices)
    queens.push(queen)
    indices = remainingIndices
    if (queens.length >= 6 && _.random(1, SIZE_N) === 6) break
  }

  queens.forEach((queen, i) => {
    // slots[queen].isQueen = true
    slots[queen].region = i + 2
    slots[queen].regionBorder = { top: false, right: false, bottom: false, left: false, }
  })

  let unregionedSlots = slots.filter((slot) => slot.region === 0)
  while (unregionedSlots.length > 0) {
    const slot = _.sample(unregionedSlots) as Slot
    const touchingIndices = getFourDirectionsIndices(slot.index)
    const regions = touchingIndices.map((touchingIndex) => slots[touchingIndex].region).filter((region) => region > 0)

    if (regions.length === 0) continue

    const region = _.max(regions) as number
    slot.region = region

    const { top, right, bottom, left } = getFourDirectionsIndicesDictionary(slot.index)

    if (top !== undefined) {
      slot.regionBorder.top = region !== slots[top].region
      slots[top].regionBorder.bottom = slot.regionBorder.top
    }

    if (right !== undefined) {
      slot.regionBorder.right = region !== slots[right].region
      slots[right].regionBorder.left = slot.regionBorder.right
    }

    if (bottom !== undefined) {
      slot.regionBorder.bottom = region !== slots[bottom].region
      slots[bottom].regionBorder.top = slot.regionBorder.bottom
    }

    if (left !== undefined) {
      slot.regionBorder.left = region !== slots[left].region
      slots[left].regionBorder.right = slot.regionBorder.left
    }

    const remainingSlots = _.difference(unregionedSlots, [slot])
    unregionedSlots = remainingSlots
  }

  return slots
}

const pickQueenSlot = (indices: number[]) => {
  if (indices.length === 0) throw new Error('No indices provided to pick queen')

  const queen = _.sample(indices) as number
  const touchingIndices = getTouchingIndices(queen)
  const sameRowIndices = getSameRowIndices(queen)
  const sameColumnIndices = getSameColumnIndices(queen)
  const remainingIndices = _.difference(indices, touchingIndices, sameRowIndices, sameColumnIndices)
  return { queen, remainingIndices }
}

const checkQueensSlots = (slots: Slot[]) => {
  const regionsQueens = _.groupBy(slots.filter((slot) => slot.isQueen), 'region')
  for (const region in regionsQueens) {
    regionsQueens[region].forEach((slot) => {
      slot.isConflicted = regionsQueens[region].length > 1
    })
  }

  const regions = _.groupBy(slots, 'region')
  const numberOfRegions = Object.keys(regions).length
  const numberOfAllocatedRegions = Object.keys(regionsQueens).length

  const satisfied = Object.values(regionsQueens).every((queens) => queens.length === 1)
    && numberOfRegions === numberOfAllocatedRegions
  return satisfied
}

const getSameRowIndices = (a: number) => {
  const row = Math.floor(a / SIZE_N)
  return Array.from({ length: SIZE_N }, (_, i) => row * SIZE_N + i)
}

const getSameColumnIndices = (a: number) => {
  const column = a % SIZE_N
  return Array.from({ length: SIZE_N }, (_, i) => i * SIZE_N + column)
}

const getTouchingIndices = (a: number) => {
  const previousRow = Math.floor(a / SIZE_N) - 1
  const currentRow = Math.floor(a / SIZE_N)
  const nextRow = Math.floor(a / SIZE_N) + 1

  const previousRowIndices = [a - (SIZE_N - 1), a - SIZE_N, a - (SIZE_N + 1)].filter((index) => _.inRange(index, previousRow * SIZE_N, (previousRow + 1) * SIZE_N))
  const currentRowIndices = [a - 1, a, a + 1].filter((index) => _.inRange(index, currentRow * SIZE_N, (currentRow + 1) * SIZE_N))
  const nextRowIndices = [a + (SIZE_N - 1), a + SIZE_N, a + (SIZE_N + 1)].filter((index) => _.inRange(index, nextRow * SIZE_N, (nextRow + 1) * SIZE_N))

  const touchingIndices = [
    ...previousRowIndices,
    ...currentRowIndices,
    ...nextRowIndices,
  ].filter((index) => index >= 0 && index < SIZE_BOARD)

  return touchingIndices
}

const getFourDirectionsIndices = (a: number) => {
  const dic = getFourDirectionsIndicesDictionary(a)
  return _.values(dic).filter((index) => index !== undefined) as number[]
}


const getFourDirectionsIndicesDictionary = (a: number) => {
  const previousRow = Math.floor(a / SIZE_N) - 1
  const currentRow = Math.floor(a / SIZE_N)
  const nextRow = Math.floor(a / SIZE_N) + 1

  const upIndex = a - SIZE_N
  const downIndex = a + SIZE_N
  const leftIndex = a - 1
  const rightIndex = a + 1

  const touchingIndices = {
    top: _.inRange(upIndex, previousRow * SIZE_N, (previousRow + 1) * SIZE_N) && _.inRange(upIndex, 0, SIZE_BOARD) ? upIndex : undefined,
    bottom: _.inRange(downIndex, nextRow * SIZE_N, (nextRow + 1) * SIZE_N) && _.inRange(downIndex, 0, SIZE_BOARD) ? downIndex : undefined,
    left: _.inRange(leftIndex, currentRow * SIZE_N, (currentRow + 1) * SIZE_N) && _.inRange(leftIndex, 0, SIZE_BOARD) ? leftIndex : undefined,
    right: _.inRange(rightIndex, currentRow * SIZE_N, (currentRow + 1) * SIZE_N) && _.inRange(rightIndex, 0, SIZE_BOARD) ? rightIndex : undefined,
  }

  return touchingIndices
}