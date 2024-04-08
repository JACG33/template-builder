const TextWrap = ({ handleChange, configTemplate }) => {
  return (
    <div className="display__select__wp">
      <span>Text Wrap</span>
      <select name="textWrap" id="" onChange={handleChange} value={configTemplate?.textWrap ? configTemplate.textWrap : ""}>
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