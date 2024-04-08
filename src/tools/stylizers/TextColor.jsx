const TextColor = ({ handleChange, configTemplate }) => {
  return (
    <div className="display__select__wp">
      <label htmlFor="color">Color</label>
      <input type="color" id="color" name="color" onChange={handleChange} value={configTemplate?.color ? configTemplate.color : "#ffffff"} />
    </div>
  )
}


export default TextColor