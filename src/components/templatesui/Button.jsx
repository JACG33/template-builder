import { ButtonStyles } from "../../constants/baseStyle"
import BaseElement from "./BaseElement"

/**
 * Componente Button
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Button = ({ id, dataParent , children, styles = {}}) => {
  return (
    <BaseElement TypeElement={"button"} id={id} placeholder={{...ButtonStyles,...styles}} dataAttribute={"Button"} dataParent={dataParent}>Click</BaseElement>
  )
}

export default Button