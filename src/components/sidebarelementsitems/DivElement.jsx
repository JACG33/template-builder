import { WrapperComponents } from '../../layouts/WrapperComponents'
import MoldeElement from './MoldeElement'

const DivElement = () => {
  return (
    <WrapperComponents secctionName={"Containers"}>
      <MoldeElement htmlType={"div"} nameComponent={"Div"} other={"div"}/>
    </WrapperComponents>
  )
}

export default DivElement