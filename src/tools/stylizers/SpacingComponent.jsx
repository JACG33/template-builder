import { useState } from "react";

const SpacingComponent = ({ text, handleChange, configTemplate, sizeName }) => {
  const [typeWidth, setTypeWidth] = useState({ size: "px" })

  const typeWidthHandleChange = (e) => {
    let data = { size: e.target.value }
    setTypeWidth(data)
    handleChange(e)
  }

  return (
    <div className="w-full grid gap-2">
      <div className="w-full flex items-center  gap-2 justify-between">
        <label>{text}</label>
        <select onChange={typeWidthHandleChange} name={sizeName} data-type="select" value={typeWidth.size}>
          <option value="px">px</option>
          <option value="%">%</option>
          <option value="em">em</option>
          <option value="rem">rem</option>
        </select>
      </div>
      <div className="w-full grid grid-cols-4">
        <input className="w-12" type="number" name={sizeName} data-sizetype={typeWidth.size} data-position='0' onChange={handleChange} min={0} max={99999}
          value={
            configTemplate?.[sizeName] ? configTemplate[sizeName][0] : "10"
          } />
        <input className="w-12" type="number" name={sizeName} data-sizetype={typeWidth.size} data-position='1' onChange={handleChange} min={0} max={99999}
          value={
            configTemplate?.[sizeName] ? configTemplate[sizeName][1] : "10"
          } />
        <input className="w-12" type="number" name={sizeName} data-sizetype={typeWidth.size} data-position='2' onChange={handleChange} min={0} max={99999}
          value={
            configTemplate?.[sizeName] ? configTemplate[sizeName][2] : "10"
          } />
        <input className="w-12" type="number" name={sizeName} data-sizetype={typeWidth.size} data-position='3' onChange={handleChange} min={0} max={99999}
          value={
            configTemplate?.[sizeName] ? configTemplate[sizeName][3] : "10"
          } />
      </div>
    </div>
  )
}

export default SpacingComponent