import BaseElement from "./BaseElement"

const placeholder = {
}
const Prgph = ({ id,indexItem ,isParentComponent}) => {
  return (
    <BaseElement TypeElement={"p"} id={id} placeholder={placeholder} dataAttribute={"Prgph"} indexItem={indexItem} isParentComponent={isParentComponent}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus assumenda illo laudantium maiores earum, non placeat rem numquam molestias laboriosam aliquid ut alias velit ipsam asperiores ducimus ratione quisquam quia.
    </BaseElement>
  )
}

export default Prgph