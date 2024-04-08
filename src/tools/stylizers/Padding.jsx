import { useState, useEffect } from 'react'
import SideOptions from './SideOptions'
const Padding = ({ handleChange, configTemplate, configRef }) => {
  const [typeWidth, setTypeWidth] = useState({ size: "px" })
  const [split, setSplit] = useState("joined")

  const setSplitType = (splitvalue) => setSplit(splitvalue)

  const typeWidthHandleChange = (e) => {
    let data = { size: e.target.value }
    setTypeWidth(data)
    handleChange(e)
  }

  useEffect(() => {
    if (configRef?.current?.["padding"]) {
      let size = configRef.current["padding"].split(" ")[0].replace(/[0-9]+/, "")
      if (size != "auto") setTypeWidth({ size })
    }
  }, [])


  return (
    <div className="padding__wrp">
      <div className="padding__header">
        <label htmlFor={"padding1"}>Padding</label>
        <SideOptions setSplitType={setSplitType} split={split} />
        <select className="h-full" onChange={typeWidthHandleChange} id={"padding1"} name={"padding"} data-type="select" value={typeWidth.size}>
          <option value="px">px</option>
          <option value="%">%</option>
          <option value="em">em</option>
          <option value="rem">rem</option>
          <option value="vh">vh</option>
          <option value="vw">vw</option>
        </select>
      </div>
      {split == "joined" && <div className="padding__joined">
        <input className="w-full" type="number" name={"padding"} data-sizetype={typeWidth.size} data-split={split} data-position='0' onChange={handleChange} min={0} max={99999}
          value={
            configTemplate?.["padding"] ? configTemplate["padding"][0] : ""
          } />
      </div>}

      {split == "separated" && <div className="padding__separated">
        <div>
          <span>top</span>
          <input className="w-full" type="number" name={"padding"} data-sizetype={typeWidth.size} data-split={split} data-position='0' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["padding"] ? configTemplate["padding"][0] : ""
            } />
        </div>
        <div>
          <span>right</span>
          <input className="w-full" type="number" name={"padding"} data-sizetype={typeWidth.size} data-split={split} data-position='1' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["padding"] ? configTemplate["padding"][1] : ""
            } />
        </div>
        <div>
          <span>bottom</span>
          <input className="w-full" type="number" name={"padding"} data-sizetype={typeWidth.size} data-split={split} data-position='2' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["padding"] ? configTemplate["padding"][2] : ""
            } />
        </div>
        <div>
          <span>left</span>
          <input className="w-full" type="number" name={"padding"} data-sizetype={typeWidth.size} data-split={split} data-position='3' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["padding"] ? configTemplate["padding"][3] : ""
            } />
        </div>
      </div>}
    </div>
  )
}

export default Padding