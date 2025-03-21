import React from 'react'

const Visibility = ({ handleChange, configTemplate }) => {

  return (
    <>
      <div className="grid grid-cols-2">
        <span>Visibility</span>
        <select name="visibility" id="" onChange={handleChange} value={configTemplate?.visibility ? configTemplate.visibility : ""} className='p-2 border border-gray-100 bg-gray-700 text-gray-100 cursor-pointer rounded-lg'>
          <option value="">Select Visibility</option>
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
          <option value="collapse">Collapse</option>
          <option value="initial">Initial</option>
          <option value="inherit">Inherit</option>
        </select>
      </div>
    </>
  )
}

export default Visibility