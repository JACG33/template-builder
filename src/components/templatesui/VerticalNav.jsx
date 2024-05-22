import BaseElement from "./BaseElement"

const placeholder = {
  padding: "15px 0px 15px 0px",
  width: "100%",
  backgroundColor: "#ffcc22"
}

/**
 * Componente VerticalNav
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const VerticalNav = ({ id, dataParent, children, styles = {} }) => {

  return (<BaseElement TypeElement={"nav"} id={id} placeholder={{ ...placeholder, ...styles }} dataAttribute={"VerticalNav"} dataParent={dataParent} >{children}</BaseElement>)
}

export default VerticalNav