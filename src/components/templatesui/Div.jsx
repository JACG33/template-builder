import { DivStyles } from "../../constants/baseStyle"
import BaseElement from "./BaseElement"

/**
 * Componente Div
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Div = ({ id, dataParent, children, styles = {} }) => {
  return (
    <BaseElement TypeElement={"div"} id={id} placeholder={{ ...DivStyles, ...styles }} dataAttribute={"Div"} dataParent={dataParent} />
  )
}

export default Div