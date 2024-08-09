import { DivStyles } from "../../constants/baseStyle"
import BaseElement from "./BaseElement"

/**
 * Componente Div
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Div = ({ id, dataParent, children, styles = {}, moreParams = {},cssSelector=[] }) => {
  return (
    <BaseElement aditionalAttributes={{ ...moreParams }} TypeElement={"div"} id={id} placeholder={{ ...DivStyles, ...styles }} dataAttribute={"Div"} dataParent={dataParent} cssSelector={cssSelector} />
  )
}

export default Div