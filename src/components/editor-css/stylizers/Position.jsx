const Position = ({ handleChange, configTemplate }) => {

  return (
    <>
      <div className="grid gap-2">
        <span>Postion</span>
        <select name="position" id="" onChange={handleChange} value={configTemplate?.position ? configTemplate.position : ""} className="rounded-lg p-2 cursor-pointer text-gray-700">
          <option value="">Select Position</option>
          <option value="static">Static</option>
          <option value="absolute">Absolute</option>
          <option value="fixed">Fixed</option>
          <option value="relative">Relative</option>
          <option value="sticky">Sticky</option>
          <option value="initial">Initial</option>
          <option value="inherit">Inherit</option>
        </select>
      </div>
    </>
  )
}

export default Position