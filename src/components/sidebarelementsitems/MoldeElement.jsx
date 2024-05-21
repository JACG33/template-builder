import { useDraggable } from "@dnd-kit/core"
import "./moldeelement.css"

const MoldeElement = ({ nameComponent, htmlType ,componentUi=false}) => {

  const draggableElement = useDraggable({
    id: nameComponent,
    data: {
      component: nameComponent,
      typehtml: htmlType,
      sideBar: true,
      componentUi
    }
  })
  return (
    <div
      draggable
      ref={draggableElement.setNodeRef}
      {...draggableElement.listeners}
      {...draggableElement.attributes}
      className="molde__element border rounded-md text-center cursor-pointer" >
      {htmlType}
    </div>
  )
}


export const MoldeElementOverlay = ({ htmlType }) => {

  return (
    <div
      style={{border:"1px solid white",background:"#ccc",textAlign:"center",borderRadius:"8px",padding:"3px 6px"}}
      className="molde__element border rounded-md text-center cursor-pointer" >
      {htmlType}
    </div>
  )
}

export default MoldeElement