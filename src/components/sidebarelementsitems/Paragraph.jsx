import { WrapperComponents } from '../../layouts/WrapperComponents'
import MoldeElement from './MoldeElement'

const Paragraph = () => {
  return (
    <WrapperComponents secctionName={"Text"}>
      <MoldeElement htmlType={"p"} nameComponent={"Prgph"} other={"p"} />
      <MoldeElement htmlType={"span"} nameComponent={"Span"} other={"span"} />
    </WrapperComponents>
  )
}

export default Paragraph