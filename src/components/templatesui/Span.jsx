import { SpanStyles } from "../../constants/baseStyle"
import BaseElement from "./BaseElement"

/**
 * Componente Span
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Span = ({ id, dataParent, children, styles = {},moreParams={},cssSelector=[],innerText }) => {
  return (
    <BaseElement aditionalAttributes={{ ...moreParams }} TypeElement={"span"} id={id} placeholder={{ ...SpanStyles, ...styles }} dataAttribute={"Span"} dataParent={dataParent} cssSelector={cssSelector} innerText={innerText}/>
  )
}

export default Span