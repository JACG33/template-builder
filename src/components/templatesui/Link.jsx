import { LinkSyles } from "../../constants/baseStyle"
import BaseElement from "./BaseElement"

/**
 * Componente Link
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Link = ({ id, dataParent, children, styles = {}, moreParams = {},cssSelector=[] }) => {
  return (
    <BaseElement aditionalAttributes={{ ...moreParams }} TypeElement={"a"} id={id} placeholder={{ ...LinkSyles, ...styles }} dataAttribute={"Link"} dataParent={dataParent} cssSelector={cssSelector}>Link{children}</BaseElement>
  )
}

export default Link