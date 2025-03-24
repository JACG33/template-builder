import { WrapperComponents } from "../../wrapper-components/WrapperComponents"
import MoldeElement from "./MoldeElement"

const MainTagElement = () => {
	return (
		<WrapperComponents secctionName={"Main"}>
			<MoldeElement
				htmlType={"main"}
				nameComponent={"MainTag"}
				other={"main"}

			/>
		</WrapperComponents>
	)
}

export default MainTagElement;