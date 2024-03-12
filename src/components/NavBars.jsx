import { useDragAndDropProvider } from "../context/DragDropProvider";
import { WrapperComponents } from "../layouts/WrapperComponents";

export default function NavBars() {
  const {handleDragginElement } = useDragAndDropProvider()
  return (
    <WrapperComponents secctionName={"NavBars"}>
      <div className="border rounded-md text-center cursor-pointer" draggable data-component='VerticalNav' data-typehtml="nav" onDragStartCapture={handleDragginElement}>
        VerticalNav {"<nav>"}
      </div>
    </WrapperComponents>
  )
}
