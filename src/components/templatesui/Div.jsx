import BaseElement from "./BaseElement"

const placeholder = {
  backgroundColor: "#cccccc",
  height: "50px"
}
const Div = ({ id, indexItem }) => {
  return (
    <BaseElement TypeElement={"div"} id={id} placeholder={placeholder} dataAttribute={"Div"} indexItem={indexItem} />
  )
}

export default Div