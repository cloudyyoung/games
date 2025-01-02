import { Text } from "../components/text"
import { Heading } from "../components/heading"

import Queen from "../components/queen"
import ExampleGrid from "../components/example"
import { EACH_COLOR_REGION_EXAMPLE, EACH_COLUMN_EXAMPLE, EACH_ROW_EXAMPLE, QUEENS_TOUCHING_EXAMPLE } from "../utils/examples"
import { Divider } from "../components/divider"

const Tutorial = () => {
  return (
    <div className="space-y-8">
      <Heading>How to play</Heading>
      <Text>
        Place the <Queen /> on the board so that no two <Queen /> can attack each other.
        This means that no two <Queen /> can be in the same row, column, or color region.
      </Text>

      <Divider soft />

      <div className="grid lg:grid-cols-2 grid-rows-2 gap-6">
        <div className="space-y-4">
          <Text>Each row can only have one <Queen />.</Text>
          <ExampleGrid slots={EACH_ROW_EXAMPLE} />
        </div>

        <div className="space-y-4">
          <Text>Each column can only have one <Queen />.</Text>
          <ExampleGrid slots={EACH_COLUMN_EXAMPLE} />
        </div>

        <div className="space-y-4">
          <Text>Each color region can only have one <Queen />.</Text>
          <ExampleGrid slots={EACH_COLOR_REGION_EXAMPLE} />
        </div>

        <div className="space-y-4">
          <Text>Two <Queen /> cannot touch each other, not even diagonally.</Text>
          <ExampleGrid slots={QUEENS_TOUCHING_EXAMPLE} />
        </div>
      </div>
    </div>
  )
}

export default Tutorial