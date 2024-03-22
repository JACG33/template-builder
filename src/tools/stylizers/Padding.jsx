import SpacingComponent from "./SpacingComponent"

const Padding = ({ handleChange, configTemplate }) => {
  return (
    <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Padding"} sizeName={"padding"} />
  )
}

export default Padding