import React from 'react'

const ZIndex = ({ handleChange, configTemplate }) => {
  return (
    <div className="display__select__wp">
      <label htmlFor="zIndex">Z-Index</label>
      <input className='w-full' type="text" id="zIndex" name="zIndex" onChange={handleChange} value={configTemplate?.zIndex ? configTemplate.zIndex : ""} />
    </div>
  )
}

export default ZIndex