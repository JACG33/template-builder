import { useDraggable } from "@dnd-kit/core"
import "./moldeelement.css"

/**
 * Componente que renderiza cualquiera de los componentes que se encuentran en este directorio.
 * @param {Object} opc Objeto de parametros.
 * @param {String} opc.nameComponent Nombre del Componente.
 * @param {String} opc.htmlType Tipo de etiqueta HTML. 
 * @param {Boolean} opc.componentUi Boolean que identifica si es un componente prediseñado. 
 * @param {Object} opc.subElements Objeto de los subelementos que pueda tener el componente. 
 * @param {String|Number} opc.other Identificador del componete. 
 * @param {Object} opc.styles Objeto de los estilos del componente. 
 * @param {Object} opc.stylesModifiers Objeto de los estilos modificadores del componente. 
 * @param {Object} opc.scripts Objeto de los scripts del componente, normalmente es para los componentes prediseñados. 
 * @param {String} opc.textToComponent Texto placeholder que tendra el componente. 
 * @returns 
 */
const MoldeElement = ({ nameComponent, htmlType, componentUi = false, subElements = {}, other, styles = {}, stylesModifiers = {}, scripts = null,textToComponent="" }) => {

  const draggableElement = useDraggable({
    id: other,
    data: {
      component: nameComponent,
      typehtml: htmlType,
      sideBar: true,
      componentUi,
      subElements,
      styles,
      stylesModifiers,
      scripts,
      textToComponent
    }
  })
  return (
    <div
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
      style={{ border: "1px solid white", background: "#ccc", textAlign: "center", borderRadius: "8px", padding: "3px 6px" }}
      className="molde__element border rounded-md text-center cursor-pointer" >
      {htmlType}
    </div>
  )
}

export default MoldeElement