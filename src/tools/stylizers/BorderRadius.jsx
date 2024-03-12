const BorderRadius = ({ handleChange, configTemplate }) => {
  return (
    <div>
      <span>Border Radius</span>
      <div className="flex items-center gap-2">
        <input type="number" name="borderRadius" min={0} max={10000} onChange={handleChange} value={configTemplate?.borderRadius ? configTemplate.borderRadius[0] : 0} />
      </div>
    </div>
  )
}

export default BorderRadius