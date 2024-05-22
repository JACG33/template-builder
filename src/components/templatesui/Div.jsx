import BaseElement from "./BaseElement"

const placeholder = {
  backgroundColor: "#cccccc",
  height: "50px",
  padding: "10px 0px"
}

/**
 * Componente Div
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Div = ({ id, dataParent, children, styles = {} }) => {
  return (
    <BaseElement TypeElement={"div"} id={id} placeholder={{ ...placeholder, ...styles }} dataAttribute={"Div"} dataParent={dataParent} />
  )
}

export default Div