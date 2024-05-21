import { WrapperComponents } from '../../layouts/WrapperComponents'
import MoldeElement from './MoldeElement'

const ButtonElement = () => {
  return (
    <WrapperComponents secctionName={"Buttons"}>
      <MoldeElement htmlType={"button"} nameComponent={"Button"} other={"button"} />
    </WrapperComponents>
  )
}

export default ButtonElement