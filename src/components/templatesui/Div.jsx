import BaseElement from "./BaseElement"

const placeholder = {
  backgroundColor: "#cccccc",
  height: "50px"
}
const Div = ({ id }) => {


  return (
    <BaseElement TypeElement={"div"} id={id} placeholder={placeholder} />
  )
}

export default Div