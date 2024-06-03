import { PrgphStyles } from "../../constants/baseStyle"
import BaseElement from "./BaseElement"

/**
 * Componente Prgph
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Prgph = ({ id, dataParent, children, styles = {}, moreParams = {},cssSelector=[] }) => {
  return (
    <BaseElement aditionalAttributes={{ ...moreParams }} TypeElement={"p"} id={id} placeholder={{ ...PrgphStyles, ...styles }} dataAttribute={"Prgph"} dataParent={dataParent} cssSelector={cssSelector}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus assumenda illo laudantium maiores earum, non placeat rem numquam molestias laboriosam aliquid ut alias velit ipsam asperiores ducimus ratione quisquam quia.
    </BaseElement>
  )
}

export default Prgph