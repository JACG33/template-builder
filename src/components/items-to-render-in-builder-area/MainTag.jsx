import { MainStyles } from "../../constants/baseStyle";
import BaseElement from "./BaseElement"

const MainTag = ({ id, dataParent, children, styles = {}, moreParams = {}, cssSelector = [] }) => {
	return (
		<BaseElement
			aditionalAttributes={{ ...moreParams }} 
			TypeElement={"main"} 
			id={id} 
			placeholder={{ ...MainStyles, ...styles }} 
			dataAttribute={"MainTag"} 
			dataParent={dataParent} 
			cssSelector={cssSelector} 
		/>
	)
}

export default MainTag;