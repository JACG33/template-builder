import { useDragAndDropProvider } from '../context/DragDropProvider'
import { WrapperComponents } from '../layouts/WrapperComponents'

const DivElement = () => {
  const {handleDragginElement } = useDragAndDropProvider()
  return (
    <WrapperComponents secctionName={"Containers"}>
      <div className="border rounded-md text-center cursor-pointer" draggable data-component='Div' onDragStartCapture={handleDragginElement}>
        DivElement {"<div>"}
      </div>
    </WrapperComponents>
  )
}

export default DivElement