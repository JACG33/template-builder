import { WrapperComponents } from '../../layouts/WrapperComponents'
import MoldeElement from './MoldeElement'

const Paragraph = () => {
  return (
    <WrapperComponents secctionName={"Text"}>
      <MoldeElement htmlType={"p"} nameComponent={"Prgph"} other={"p"} textToComponent='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus assumenda illo laudantium maiores earum, non placeat rem numquam molestias laboriosam aliquid ut alias velit ipsam asperiores ducimus ratione quisquam quia.'/>
      <MoldeElement htmlType={"span"} nameComponent={"Span"} other={"span"} textToComponent='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus assumenda illo laudantium maiores earum, non placeat rem numquam molestias laboriosam aliquid ut alias velit ipsam asperiores ducimus ratione quisquam quia.'/>
    </WrapperComponents>
  )
}

export default Paragraph