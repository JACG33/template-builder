import SizeComponent from "./SizeComponent"

const Height = ({ handleChange, configTemplate ,configRef}) => {

  return (
    <SizeComponent configTemplate={configTemplate} handleChange={handleChange} text={"Height"} sizeName={"height"} configRef={configRef} />
  )
}

export default Height