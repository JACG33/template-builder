const BackgroundColor = ({ handleChange, configTemplate }) => {
  return (
    <div className="w-full flex justify-start gap-2">
      <label htmlFor="bgColor">BackgroundColor</label>
      <input type="color" id="bgColor" name="backgroundColor" onChange={handleChange} value={configTemplate?.backgroundColor ? configTemplate.backgroundColor : "#cccccc"} />
    </div>
  )
}

export default BackgroundColor