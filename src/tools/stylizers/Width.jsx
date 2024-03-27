import SizeComponent from "./SizeComponent"

const Width = ({ handleChange, configTemplate, configRef }) => {

  return (
    <SizeComponent configTemplate={configTemplate} handleChange={handleChange} text={"Width"} sizeName={"width"} configRef={configRef} />
  )
}

export default Width