import { useEffect, useState } from "react"

import { Button } from "./components/button"
import { Text } from "./components/text"
import { Heading } from "./components/heading"
import { SlotsType, SlotType } from "./types/slot"
import { checkQueensSlots, generateSlots, toggleCrossed } from "./utils/helpers"
import { SIZE_BOARD, SIZE_N } from "./utils/constants"
import { Slot } from "./components/slot"
import Queen from "./components/queen"

export const App = () => {
  const [slots, setSlots] = useState<SlotsType>([])
  const [satisfied, setSatisfied] = useState(false)

  useEffect(() => {
    const slots = generateSlots()
    setSlots(slots)
    setSatisfied(false)
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

          <div className="text-4xl font-extrabold text-center uppercase">// Queens //</div>

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

          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-px w-full" fill="none"><defs><pattern id=":S2:" patternUnits="userSpaceOnUse" width="16" height="1"><line className="stroke-zinc-950 dark:stroke-white" x1="0" x2="16" y1="0.5" y2="0.5" stroke-dasharray="2 2" stroke-width="1.5" stroke-opacity="0.1" stroke-linejoin="round"></line></pattern></defs><rect width="100%" height="100%" fill="url(#:S2:)"></rect></svg>
          </div>

          <div className="text-center">
            <Heading>How to play</Heading>
            <Text className="cursor-vertical-text">
              <div>Each row can only have one <Queen />.</div>
              <div>Each column can only have one <Queen />.</div>
              <div>Each color region can only have one <Queen />.</div>
              <div>Two <Queen /> cannot touch each other, not even diagonally.</div>
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

