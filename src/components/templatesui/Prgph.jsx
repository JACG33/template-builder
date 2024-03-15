import BaseElement from "./BaseElement"

const placeholder = {
}
const Prgph = ({ id,indexItem }) => {
  return (
    <BaseElement TypeElement={"p"} id={id} placeholder={placeholder} dataAttribute={"Prgph"} indexItem={indexItem} >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus assumenda illo laudantium maiores earum, non placeat rem numquam molestias laboriosam aliquid ut alias velit ipsam asperiores ducimus ratione quisquam quia.
    </BaseElement>
  )
}

export default Prgph