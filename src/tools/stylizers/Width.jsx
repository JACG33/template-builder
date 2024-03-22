import SizeComponent from "./SizeComponent"

const Width = ({ handleChange, configTemplate }) => {

  return (
    <SizeComponent configTemplate={configTemplate} handleChange={handleChange} text={"Width"} sizeName={"width"} />
  )
}

export default Width