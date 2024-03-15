import BaseElement from "./BaseElement"

const placeholder = {
  padding: "15px 1px",
  width: "100%",
  backgroundColor: "#ffcc22"
}

const VerticalNav = ({ id ,indexItem}) => {

  return (<BaseElement TypeElement={"nav"} id={id} placeholder={placeholder} dataAttribute={"VerticalNav"} indexItem={indexItem} />)
}

export default VerticalNav