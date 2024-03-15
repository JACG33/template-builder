const BackgroundColor = ({ handleChange, configTemplate }) => {
  return (
    <div className="w-full flex justify-start gap-2">
      <label>BackgroundColor</label>
      <input type="color" name="backgroundColor" onChange={handleChange} value={configTemplate?.backgroundColor ? configTemplate.backgroundColor : "#cccccc"} />
    </div>
  )
}

export default BackgroundColor