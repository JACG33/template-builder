import { useState } from "react"


const Width = ({ handleChange, configTemplate }) => {
  const [typeWidth, setTypeWidth] = useState("%")

  const typeWidthHandleChange = (e) => {
    setTypeWidth(e.target.value)
  }

  return (
    <div className="w-full flex justify-start gap-2">
      <label>Width</label>
      <input type="number" name="width" data-typewidth={typeWidth} onChange={handleChange} min={0} max={99999} value={configTemplate?.width ? configTemplate.width : "100"} />
      <select name="" id="" onChange={typeWidthHandleChange} value={typeWidth}>
        <option value="%">%</option>
        <option value="px">px</option>
      </select>
    </div>
  )
}

export default Width