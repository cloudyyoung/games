import { Text } from "../components/text"
import { Heading } from "../components/heading"

import Queen from "../components/queen"
import ExampleGrid from "../components/example"
import { EACH_COLOR_REGION_EXAMPLE, EACH_COLUMN_EXAMPLE, EACH_ROW_EXAMPLE, QUEENS_TOUCHING_EXAMPLE } from "../utils/examples"

const Tutorial = () => {
  return (
    <div className="text-center">
      <Heading>How to play</Heading>
      <div className="p-6">
        <div className="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-0">
          <div>
            <ExampleGrid slots={EACH_ROW_EXAMPLE} />
            <Text>Each row can only have one <Queen />.</Text>
          </div>

          <div>
            <ExampleGrid slots={EACH_COLUMN_EXAMPLE} />
            <Text>Each column can only have one <Queen />.</Text>
          </div>


          <div>
            <ExampleGrid slots={EACH_COLOR_REGION_EXAMPLE} />
            <Text>Each color region can only have one <Queen />.</Text>
          </div>

          <div>
            <ExampleGrid slots={QUEENS_TOUCHING_EXAMPLE} />
            <Text>Two <Queen /> cannot touch each other, not even diagonally.</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial