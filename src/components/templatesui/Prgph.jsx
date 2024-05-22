import BaseElement from "./BaseElement"

const placeholder = {
  color: "#000000"
}

/**
 * Componente Prgph
 * @param {Object} opc Objeto de parametros. 
 * @param {String|Number} opc.id Identificador del componente. 
 * @param {Boolean} opc.dataParent Identificador del ParentElement. 
 * @returns 
 */
const Prgph = ({ id, dataParent, children, styles = {} }) => {
  return (
    <BaseElement TypeElement={"p"} id={id} placeholder={{ ...placeholder, ...styles }} dataAttribute={"Prgph"} dataParent={dataParent}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus assumenda illo laudantium maiores earum, non placeat rem numquam molestias laboriosam aliquid ut alias velit ipsam asperiores ducimus ratione quisquam quia.
    </BaseElement>
  )
}

export default Prgph