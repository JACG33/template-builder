import { useDragAndDropProvider } from "../../hoks/useDragAndDropProvider"

const MoldeElement = ({ nameComponent, htmlType }) => {
  const { handleDragginElement } = useDragAndDropProvider()
  return (
    <div className="border rounded-md text-center cursor-pointer" draggable data-component={nameComponent} data-typehtml={htmlType} onDragStartCapture={e=>handleDragginElement({e,sideBar:true})}>
      {htmlType}
    </div>
  )
}
export default MoldeElement