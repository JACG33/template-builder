const BackgroundColor = ({ handleChange, configTemplate }) => {
  return (
    <div>
      <span>Margin</span>
      <div className="flex items-center gap-2">
        <input type="color" name="backgroundColor" onChange={handleChange} value={configTemplate?.backgroundColor ? configTemplate.backgroundColor : "#cccccc"} /><span>{configTemplate?.backgroundColor ? configTemplate.backgroundColor : "#cccccc"}</span>
      </div>
    </div>
  )
}

export default BackgroundColor