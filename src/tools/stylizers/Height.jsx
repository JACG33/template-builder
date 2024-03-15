import { useState } from "react"


const Height = ({ handleChange, configTemplate }) => {
  const [typeHeight, setTypeHeight] = useState("px")

  const typeHeightHandleChange = (e) => {
    setTypeHeight(e.target.value)
  }

  return (
    <div className="w-full flex justify-start gap-2">
      <label>Height</label>
      <input type="number" name="height" data-typeheight={typeHeight} onChange={handleChange} min={0} max={99999} value={configTemplate?.height ? configTemplate.height : "100"} />
      <select name="" id="" onChange={typeHeightHandleChange} value={typeHeight}>
        <option value="%">%</option>
        <option value="px">px</option>
      </select>
    </div>
  )
}

export default Height