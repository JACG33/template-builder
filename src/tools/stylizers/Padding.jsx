import SpacingComponent from "./SpacingComponent"

const Padding = ({ handleChange, configTemplate, configRef }) => {
  return (
    <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Padding"} sizeName={"padding"} configRef={configRef} />
  )
}

export default Padding