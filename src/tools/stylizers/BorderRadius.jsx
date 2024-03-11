const BorderRadius = ({ handleChange, configTemplate }) => {
  return (
    <div>
      <span>Border Radius</span>
      <div className="flex items-center gap-2">
        <input type="range" name="borderRadius" min={0} max={100} onChange={handleChange} value={configTemplate?.borderRadius ? configTemplate.borderRadius[0] : 0} /><span>{configTemplate?.borderRadius ? configTemplate.borderRadius[0] : 0}%</span>
      </div>
    </div>
  )
}

export default BorderRadius