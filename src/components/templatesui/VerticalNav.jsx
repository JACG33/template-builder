import BaseElement from "./BaseElement"

const placeholder = {
  padding: "15px 0px 15px 0px",
  width: "100%",
  backgroundColor: "#ffcc22"
}

const VerticalNav = ({ id ,indexItem,isParentComponent}) => {

  return (<BaseElement TypeElement={"nav"} id={id} placeholder={placeholder} dataAttribute={"VerticalNav"} indexItem={indexItem} isParentComponent={isParentComponent}/>)
}

export default VerticalNav