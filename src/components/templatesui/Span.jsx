import { SpanStyles } from "../../constants/baseStyle"
import BaseElement from "./BaseElement"

/**
 * Componente Span
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Span = ({ id, dataParent, children, styles = {},moreParams={},cssSelector=[] }) => {
  return (
    <BaseElement aditionalAttributes={{ ...moreParams }} TypeElement={"span"} id={id} placeholder={{ ...SpanStyles, ...styles }} dataAttribute={"Span"} dataParent={dataParent} cssSelector={cssSelector}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus assumenda illo laudantium maiores earum, non placeat rem numquam molestias laboriosam aliquid ut alias velit ipsam asperiores ducimus ratione quisquam quia.
    </BaseElement>
  )
}

export default Span