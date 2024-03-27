import BaseElement from "./BaseElement"

const placeholder = {
}
const Span = ({ id ,indexItem,isParentComponent}) => {
  return (
    <BaseElement TypeElement={"span"} id={id} placeholder={placeholder} dataAttribute={"Span"} indexItem={indexItem} isParentComponent={isParentComponent}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus assumenda illo laudantium maiores earum, non placeat rem numquam molestias laboriosam aliquid ut alias velit ipsam asperiores ducimus ratione quisquam quia.
    </BaseElement>
  )
}

export default Span