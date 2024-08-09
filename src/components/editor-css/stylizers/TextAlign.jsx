const TextAlign = ({ handleChange, configTemplate }) => {
  return (
    <div className="display__select__wp">
      <span>Text Align</span>
      <select name="textAlign" id="" onChange={handleChange} value={configTemplate?.textAlign ? configTemplate.textAlign : ""}>
        <option value="">Select Align</option>
        <option value="center">center</option>
        <option value="justify">justify</option>
        <option value="start">start</option>
        <option value="end">end</option>
        <option value="left">left</option>
        <option value="right">right</option>
      </select>
    </div>
  )
}

export default TextAlign