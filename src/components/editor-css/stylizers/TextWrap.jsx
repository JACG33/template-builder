const TextWrap = ({ handleChange, configTemplate }) => {
  return (
    <div className="grid grid-cols-2">
      <span>Text Wrap</span>
      <select name="textWrap" id="" onChange={handleChange} value={configTemplate?.textWrap ? configTemplate.textWrap : ""} className="p-2 text-gray-700 cursor-pointer rounded-lg">
        <option value="">Select Wrap</option>
        <option value="wrap">wrap</option>
        <option value="balnce">balnce</option>
        <option value="nowrap">nowrap</option>
        <option value="pretty">pretty</option>
      </select>
    </div>
  )
}

export default TextWrap