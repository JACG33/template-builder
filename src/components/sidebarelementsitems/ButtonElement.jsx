import { useDragAndDropProvider } from '../../context/DragDropProvider'
import { WrapperComponents } from '../../layouts/WrapperComponents'

const ButtonElement = () => {
  const {handleDragginElement } = useDragAndDropProvider()
  return (
    <WrapperComponents secctionName={"Buttons"}>
      <div className="border rounded-md text-center cursor-pointer" draggable data-component='Button' data-typehtml="button" onDragStartCapture={handleDragginElement}>
        ButtonElement {"<button>"}
      </div>
    </WrapperComponents>
  )
}

export default ButtonElement