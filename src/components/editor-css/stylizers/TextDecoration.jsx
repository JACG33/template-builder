import React from 'react'

const TextDecoration = ({handleChange,configTemplate}) => {
  return (
    <div className="display__select__wp">
      <label htmlFor="textDecoration">Text Decoration</label>
      <input className='w-full' type="text" id="textDecoration" name="textDecoration" onChange={handleChange} value={configTemplate?.textDecoration ? configTemplate.textDecoration : ""} />
    </div>
  )
}

export default TextDecoration