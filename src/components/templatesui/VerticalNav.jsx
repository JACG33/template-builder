import { VerticalNavStyles } from "../../constants/baseStyle"
import BaseElement from "./BaseElement"

/**
 * Componente VerticalNav
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const VerticalNav = ({ id, dataParent, children, styles = {} }) => {

  return (<BaseElement TypeElement={"nav"} id={id} placeholder={{ ...VerticalNavStyles, ...styles }} dataAttribute={"VerticalNav"} dataParent={dataParent} >{children}</BaseElement>)
}

export default VerticalNav