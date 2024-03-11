import BaseElement from "./BaseElement"

const placeholder = {
  borderRadius: "8px",
  padding: "8px 10px",
}
const Button = ({ id }) => {
  return (
    <BaseElement TypeElement={"button"} id={id} placeholder={placeholder}>Click</BaseElement>
  )
}

export default Button