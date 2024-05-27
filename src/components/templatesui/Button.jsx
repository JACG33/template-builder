import { ButtonStyles } from "../../constants/baseStyle"
import * as Icons from "../svg"
import BaseElement from "./BaseElement"
/**
 * Componente Button
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Button = ({ id, dataParent, children, styles = {}, moreParams }) => {
  let nameIcon = moreParams?.icon ? moreParams?.icon : ""
  return (
    <BaseElement aditionalAttributes={{ ...moreParams }} TypeElement={"button"} id={id} placeholder={{ ...ButtonStyles, ...styles }} dataAttribute={"Button"} dataParent={dataParent}>
      {nameIcon == "" && ("Click")}
      {nameIcon == "Menu2" && <Icons.Menu2 />}
    </BaseElement>
  )
}

export default Button