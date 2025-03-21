import React from 'react'

const Opacity = ({handleChange,configTemplate}) => {
  return (
    <div className="grid grid-cols-2">
      <label htmlFor="opacity">Opacity</label>
      <input className='w-full border border-gray-100 text-gray-100 px-2 py-1 rounded-lg' type="number" min={0} max={1} step={0.01} id="opacity" name="opacity" onChange={handleChange} value={configTemplate?.opacity ? configTemplate.opacity : ""} />
    </div>
  )
}

export default Opacity