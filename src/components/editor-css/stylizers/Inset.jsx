import React from 'react'
import SpacingComponent from './SpacingComponent'

const Inset = ({ handleChange, configTemplate, configRef }) => {
  return (
    <div className="">
      <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Position"} sizeName={"inset"} configRef={configRef} positionNumber={0} positionText={"top"} sizeAuto={true} />
      <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Position"} sizeName={"inset"} configRef={configRef} positionNumber={1} positionText={"right"} sizeAuto={true} />
      <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Position"} sizeName={"inset"} configRef={configRef} positionNumber={2} positionText={"bottom"} sizeAuto={true} />
      <SpacingComponent configTemplate={configTemplate} handleChange={handleChange} text={"Position"} sizeName={"inset"} configRef={configRef} positionNumber={3} positionText={"left"} sizeAuto={true} />
    </div>
  )
}

export default Inset