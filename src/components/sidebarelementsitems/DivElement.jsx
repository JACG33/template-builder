import { useDragAndDropProvider } from '../../hoks/useDragAndDropProvider'
import { WrapperComponents } from '../../layouts/WrapperComponents'

const DivElement = () => {
  const {handleDragginElement } = useDragAndDropProvider()
  return (
    <WrapperComponents secctionName={"Containers"}>
      <div className="border rounded-md text-center cursor-pointer" draggable data-component='Div' data-typehtml="div" onDragStartCapture={handleDragginElement}>
        DivElement {"<div>"}
      </div>
    </WrapperComponents>
  )
}

export default DivElement