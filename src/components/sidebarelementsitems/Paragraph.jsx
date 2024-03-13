import { useDragAndDropProvider } from '../../context/DragDropProvider'
import { WrapperComponents } from '../../layouts/WrapperComponents'

const Paragraph = () => {
  const {handleDragginElement } = useDragAndDropProvider()
  return (
    <WrapperComponents secctionName={"Text"}>
      <div className="border rounded-md text-center cursor-pointer" draggable data-component='Prgph' data-typehtml="p" onDragStartCapture={handleDragginElement}>
        Paragraph {"<p>"}
      </div>
      <div className="border rounded-md text-center cursor-pointer" draggable data-component='Span' data-typehtml="span" onDragStartCapture={handleDragginElement}>
        Text {"<span>"}
      </div>
    </WrapperComponents>
  )
}

export default Paragraph