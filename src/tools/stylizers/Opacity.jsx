import React from 'react'

const Opacity = ({handleChange,configTemplate}) => {
  return (
    <div className="display__select__wp">
      <label htmlFor="opacity">Opacity</label>
      <input className='w-full' type="number" min={0} max={1} step={0.01} id="opacity" name="opacity" onChange={handleChange} value={configTemplate?.opacity ? configTemplate.opacity : ""} />
    </div>
  )
}

export default Opacity