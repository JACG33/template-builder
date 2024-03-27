import { useState, useEffect } from "react";

const SpacingComponent = ({ text, handleChange, configTemplate, sizeName, configRef }) => {
  const [typeWidth, setTypeWidth] = useState({ size: "px" })

  const typeWidthHandleChange = (e) => {
    let data = { size: e.target.value }
    setTypeWidth(data)
    handleChange(e)
  }

  useEffect(() => {
    if (configRef?.current?.[sizeName]) {
      let size = configRef.current[sizeName].split(" ")[0].replace(/[0-9]+/, "")
      if (size != "auto") setTypeWidth({ size })
    }
  }, [])


  return (
    <div className="w-full grid gap-2 py-1">
      <div className="w-full flex items-center  gap-2 justify-between">
        <label htmlFor={`${sizeName}1`}>{text}</label>
        <select className="h-full" onChange={typeWidthHandleChange} id={`${sizeName}1`} name={sizeName} data-type="select" value={typeWidth.size}>
          <option value="px">px</option>
          <option value="%">%</option>
          <option value="em">em</option>
          <option value="rem">rem</option>
          <option value="vh">vh</option>
          <option value="vw">vw</option>
        </select>
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        <div>
          <span>top</span>
          <input className="w-full" type="number" name={sizeName} data-sizetype={typeWidth.size} data-position='0' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.[sizeName] ? configTemplate[sizeName][0] : ""
            } />
        </div>
        <div>
          <span>right</span>
          <input className="w-full" type="number" name={sizeName} data-sizetype={typeWidth.size} data-position='1' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.[sizeName] ? configTemplate[sizeName][1] : ""
            } />
        </div>
        <div>
          <span>bottom</span>
          <input className="w-full" type="number" name={sizeName} data-sizetype={typeWidth.size} data-position='2' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.[sizeName] ? configTemplate[sizeName][2] : ""
            } />
        </div>
        <div>
          <span>left</span>
          <input className="w-full" type="number" name={sizeName} data-sizetype={typeWidth.size} data-position='3' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.[sizeName] ? configTemplate[sizeName][3] : ""
            } />
        </div>
      </div>
    </div>
  )
}

export default SpacingComponent