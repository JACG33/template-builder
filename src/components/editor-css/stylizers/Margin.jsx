import SpacingComponent from "./SpacingComponent"

const Margin = ({ handleChange, configTemplate, configRef }) => {
  return (
    <div className="grid gap-2">
      <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Margin"} sizeName={"margin"} configRef={configRef} positionNumber={0} positionText={"top"} sizeAuto={true} />
      <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Margin"} sizeName={"margin"} configRef={configRef} positionNumber={1} positionText={"right"} sizeAuto={true} />
      <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Margin"} sizeName={"margin"} configRef={configRef} positionNumber={2} positionText={"bottom"} sizeAuto={true} />
      <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Margin"} sizeName={"margin"} configRef={configRef} positionNumber={3} positionText={"left"} sizeAuto={true} />
    </div>
  )
}

export default Margin