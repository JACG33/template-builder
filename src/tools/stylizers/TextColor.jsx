const TextColor = ({ handleChange, configTemplate }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2">
      <label htmlFor="color">Color</label>
      <input type="color" id="color" name="color" onChange={handleChange} value={configTemplate?.color ? configTemplate.color : "#ffffff"} />
    </div>
  )
}


export default TextColor