import { WrapperComponents } from "../../../layouts/WrapperComponents";
import MoldeElement from "./MoldeElement";

const ButtonElement = () => {
  return (
    <WrapperComponents secctionName={"Buttons"}>
      <MoldeElement
        htmlType={"button"}
        nameComponent={"Button"}
        other={"button"}
      />
      <MoldeElement
        htmlType={"a"}
        nameComponent={"Link"}
        other={"a"}
        textToComponent="Link"
      />
    </WrapperComponents>
  );
};

export default ButtonElement;
