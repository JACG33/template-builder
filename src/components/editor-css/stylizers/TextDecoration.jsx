import React from 'react'

const TextDecoration = ({handleChange,configTemplate}) => {
  return (
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="textDecoration">Text Decoration</label>
      <input className='w-full px-2 py-1 text-gray-700 rounded-lg' type="text" id="textDecoration" name="textDecoration" onChange={handleChange} value={configTemplate?.textDecoration ? configTemplate.textDecoration : ""} />
    </div>
  )
}

export default TextDecoration