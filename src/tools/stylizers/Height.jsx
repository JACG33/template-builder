import SizeComponent from "./SizeComponent"

const Height = ({ handleChange, configTemplate }) => {

  return (
    <SizeComponent configTemplate={configTemplate} handleChange={handleChange} text={"Height"} sizeName={"height"} />
  )
}

export default Height