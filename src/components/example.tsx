import { SlotsType } from "../types/slot"
import { Slot } from "./slot"

export interface ExampleGridProps {
  slots: SlotsType
}

const ExampleGrid = ({ slots }: ExampleGridProps) => {
  return (
    <div className="grid gap-0 grid-cols-5">
      {
        slots.map((slot, i) => (
          <Slot key={i} {...slot} />
        ))
      }
    </div>
  )
}

export default ExampleGrid