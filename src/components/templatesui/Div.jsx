import BaseElement from "./BaseElement"

const placeholder = {
  backgroundColor: "#cccccc",
  height: "50px"
}
const Div = ({ id, indexItem ,isParentComponent}) => {
  return (
    <BaseElement TypeElement={"div"} id={id} placeholder={placeholder} dataAttribute={"Div"} indexItem={indexItem} isParentComponent={isParentComponent}/>
  )
}

export default Div