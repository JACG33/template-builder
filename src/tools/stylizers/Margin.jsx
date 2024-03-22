import SpacingComponent from "./SpacingComponent"

const Margin = ({ handleChange, configTemplate }) => {
  return (
    <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Margin"} sizeName={"margin"} />
  )
}

export default Margin