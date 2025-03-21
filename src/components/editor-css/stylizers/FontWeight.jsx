const FontWeight = ({ handleChange, configTemplate }) => {
  return (
    <div className="grid grid-cols-2">
      <span>Font Weight</span>
      <select name="fontWeight" id="" onChange={handleChange} value={configTemplate?.fontWeight ? configTemplate.fontWeight : ""} className="p-2 border border-gray-100 bg-gray-700 text-gray-100 cursor-pointer rounded-lg">
        <option value="">Select Weight</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
        <option value="400">400</option>
        <option value="500">500</option>
        <option value="600">600</option>
        <option value="700">700</option>
        <option value="800">800</option>
        <option value="900">900</option>
        <option value="bold">bold</option>
        <option value="bolder">bolder</option>
        <option value="lighter">lighter</option>
        <option value="normal">normal</option>
      </select>
    </div>
  )
}

export default FontWeight