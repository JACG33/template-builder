const TextAlign = ({ handleChange, configTemplate }) => {
  return (
    <div className="grid grid-cols-2">
      <span>Text Align</span>
      <select name="textAlign" id="" onChange={handleChange} value={configTemplate?.textAlign ? configTemplate.textAlign : ""} className="p-2 border border-gray-100 bg-gray-700 text-gray-100 cursor-pointer rounded-lg">
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