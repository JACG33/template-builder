import BaseElement from "./BaseElement"

const placeholder = {
  borderRadius: "8px",
  padding: "8px 10px 8px 10px",
  backgroundColor: "#499a2c"
}

/**
 * Componente Button
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Button = ({ id, dataParent }) => {
  return (
    <BaseElement TypeElement={"button"} id={id} placeholder={placeholder} dataAttribute={"Button"} dataParent={dataParent}>Click</BaseElement>
  )
}

export default Button