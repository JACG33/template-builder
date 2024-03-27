import SpacingComponent from "./SpacingComponent"

const Margin = ({ handleChange, configTemplate ,configRef}) => {
  return (
    <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Margin"} sizeName={"margin"} configRef={configRef} />
  )
}

export default Margin