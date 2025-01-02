import { useEffect, useState } from "react"
import { useElapsedTime } from 'use-elapsed-time'

import { Button } from "../components/button"
import { SlotsType, SlotType } from "../types/slot"
import { checkQueensSlots, generateSlots, toggleCrossed } from "../utils/helpers"
import { SIZE_BOARD, SIZE_N } from "../utils/constants"
import { Slot } from "../components/slot"
import { Text, TextLink } from "../components/text"

export const Play = () => {
  const [slots, setSlots] = useState<SlotsType>([])
  const [satisfied, setSatisfied] = useState(false)
  const { elapsedTime, reset } = useElapsedTime({ isPlaying: !satisfied })
  const [steps, setSteps] = useState(0)

  useEffect(() => {
    const slots = generateSlots()
    setSlots(slots)
    setSatisfied(false)
    setSteps(0)
  }, [])

  const onClick = (slot: SlotType) => {
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
    setSteps(steps + 1)
  }

  const onReset = () => {
    setSlots(slots.map((slot) => ({ ...slot, isQueen: false, isCrossed: false, isConflicted: false })))
    setSatisfied(false)
  }

  const onNewGame = () => {
    setSlots(generateSlots())
    setSatisfied(false)
    reset()
    setSteps(0)
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between text-zinc-700 dark:text-zinc-400 tabular-nums">
          <div className="flex flex-row items-center gap-1">
            <span className="material-symbols-sharp">steps</span>
            {steps} steps
          </div>
          <div className="flex flex-row items-center gap-1">
            <span className="material-symbols-sharp">timer</span>
            {elapsedTime.toFixed(0)} seconds
          </div>
        </div>

        <div className="bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
          <div className="p-0 sm:p-4">
            <div className="outline outline-[3px] outline-zinc-800 dark:outline-zinc-600">
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
          {!satisfied && <Button onClick={onReset} outline>Reset Board</Button>}
          {satisfied && <Button onClick={onNewGame}>New Game <span className="material-symbols-sharp -mr-1">arrow_forward</span></Button>}
        </div>

        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-px w-full" fill="none"><defs><pattern id=":S2:" patternUnits="userSpaceOnUse" width="16" height="1"><line className="stroke-zinc-950 dark:stroke-white" x1="0" x2="16" y1="0.5" y2="0.5" strokeDasharray="2 2" strokeWidth="1.5" strokeOpacity="0.1" strokeLinejoin="round"></line></pattern></defs><rect width="100%" height="100%" fill="url(#:S2:)"></rect></svg>
        </div>

        <Text>
          Don't know how to play? <TextLink href="/tutorial">Check the tutorial</TextLink>
        </Text>
      </div>
    </>
  )
}

export default Play
