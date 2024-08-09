import { PrgphStyles } from "../../constants/baseStyle"
import BaseElement from "./BaseElement"

/**
 * Componente Prgph
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Prgph = ({ id, dataParent, children, styles = {}, moreParams = {},cssSelector=[] ,innerText}) => {
  return (
    <BaseElement aditionalAttributes={{ ...moreParams }} TypeElement={"p"} id={id} placeholder={{ ...PrgphStyles, ...styles }} dataAttribute={"Prgph"} dataParent={dataParent} cssSelector={cssSelector} innerText={innerText}/>
  )
}

export default Prgph