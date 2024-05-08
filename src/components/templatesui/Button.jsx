import BaseElement from "./BaseElement"

const placeholder = {
  borderRadius: "8px",
  padding: "8px 10px 8px 10px",
  backgroundColor:"#499a2c"
}
const Button = ({ id ,indexItem,isParentComponent,dataParent}) => {
  return (
    <BaseElement TypeElement={"button"} id={id} placeholder={placeholder} dataAttribute={"Button"} indexItem={indexItem} isParentComponent={isParentComponent} dataParent={dataParent}>Click</BaseElement>
  )
}

export default Button