const BackgroundColor = ({ handleChange, configTemplate }) => {
  return (
    <div className="display__select__wp">
      <label htmlFor="bgColor">BackgroundColor</label>
      <input type="color" id="bgColor" name="backgroundColor" onChange={handleChange} value={configTemplate?.backgroundColor ? configTemplate.backgroundColor : "#cccccc"} />
    </div>
  )
}

export default BackgroundColor