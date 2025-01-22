import React from 'react'

const ZIndex = ({ handleChange, configTemplate }) => {
  return (
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="zIndex">Z-Index</label>
      <input className='w-full py-1 px-2 text-gray-700 rounded-lg' type="text" id="zIndex" name="zIndex" onChange={handleChange} value={configTemplate?.zIndex ? configTemplate.zIndex : ""} />
    </div>
  )
}

export default ZIndex