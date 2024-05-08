import BaseElement from "./BaseElement"

const placeholder = {
  color:"#000000"
}
const Span = ({ id ,indexItem,isParentComponent,dataParent}) => {
  return (
    <BaseElement TypeElement={"span"} id={id} placeholder={placeholder} dataAttribute={"Span"} indexItem={indexItem} isParentComponent={isParentComponent} dataParent={dataParent}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus assumenda illo laudantium maiores earum, non placeat rem numquam molestias laboriosam aliquid ut alias velit ipsam asperiores ducimus ratione quisquam quia.
    </BaseElement>
  )
}

export default Span