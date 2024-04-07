import { WrapperComponents } from '../../layouts/WrapperComponents'
import MoldeElement from './MoldeElement'

const Paragraph = () => {
  return (
    <WrapperComponents secctionName={"Text"}>
      <MoldeElement htmlType={"p"} nameComponent={"Prgph"} />
      <MoldeElement htmlType={"span"} nameComponent={"Span"} />
    </WrapperComponents>
  )
}

export default Paragraph