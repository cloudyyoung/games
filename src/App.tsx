import clsx from "clsx"
import { useState } from "react"
import _ from "lodash"

import { Button } from "./components/button"

const SIZE_N = 10
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
      <div className="max-w-2xl mx-auto flex justify-center items-center h-screen text-zinc-950 dark:text-white p-1 sm:p-6">
        <div className="h-fit w-full space-y-6">
          <div className="text-4xl font-extrabold text-center -mt-[5%]">Queens</div>

          <div className="bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
            <div className="p-1.5 sm:p-6">
              <div className="border-4 border-zinc-950 dark:border-zinc-400">
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

  const bgColor = REGION_COLORS[region - 1]

  return (
    <div
      className={clsx(
        "aspect-square box-border border-solid border-zinc-600 dark:border-zinc-500 border-[0.5px] flex justify-center items-center cursor-pointer relative",
        bgColor,
        regionBorder.top && 'border-t-[1.5px]',
        regionBorder.right && 'border-r-[1.5px]',
        regionBorder.bottom && 'border-b-[1.5px]',
        regionBorder.left && 'border-l-[1.5px]',
        disabled && 'pointer-events-none',
      )}
      onClick={onClick}
    >
      <span className={clsx(
        'material-symbols-sharp dark:text-zinc-900 relative flex',
        (!isQueen && isCrossed) && 'text-zinc-600',
        (isQueen && isCrossed) && 'text-red-600 dark:text-red-700',
        (isQueen && isConflicted) && 'text-red-600 dark:text-red-700',
        isCrossed && 'text-xl',
        isQueen && 'text-3xl',
      )}>
        {isQueen && satisfied && <div className="absolute inline-flex animate-ping text-green-800/50">{icon}</div>}
        <div className="z-10">{icon}</div>
      </span>
    </div>
  )
}

const REGION_COLORS = [
  "bg-zinc-50 dark:bg-zinc-300",
  "bg-red-200 dark:bg-red-300",
  "bg-orange-200 dark:bg-orange-300",
  "bg-amber-200 dark:bg-amber-300",
  // "bg-yellow-200 dark:bg-yellow-300",
  "bg-lime-200 dark:bg-lime-300",
  // "bg-green-200 dark:bg-green-300",
  "bg-emerald-200 dark:bg-emerald-300",
  // "bg-teal-200 dark:bg-teal-300",
  "bg-cyan-200 dark:bg-cyan-300",
  "bg-sky-200 dark:bg-sky-300",
  // "bg-blue-200 dark:bg-blue-300",
  "bg-indigo-200 dark:bg-indigo-300",
  "bg-violet-200 dark:bg-violet-300",
  // "bg-purple-200 dark:bg-purple-300",
  "bg-fuchsia-200 dark:bg-fuchsia-300",
  "bg-pink-200 dark:bg-pink-300",
  "bg-rose-200 dark:bg-rose-300",
]

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