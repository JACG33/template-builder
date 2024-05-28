import React from 'react'

const Visibility = ({ handleChange, configTemplate }) => {

  return (
    <>
      <div className="display__select__wp">
        <span>Visibility</span>
        <select name="visibility" id="" onChange={handleChange} value={configTemplate?.visibility ? configTemplate.visibility : ""}>
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