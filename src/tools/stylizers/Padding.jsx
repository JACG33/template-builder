import {useState,useEffect} from 'react'
const Padding = ({ handleChange, configTemplate, configRef }) => {
  const [typeWidth, setTypeWidth] = useState({ size: "px" })

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
    <div className="w-full grid gap-2 py-1">
      <div className="w-full flex items-center  gap-2 justify-between">
        <label htmlFor={"padding1"}>Padding</label>
        <select className="h-full" onChange={typeWidthHandleChange} id={"padding1"} name={"padding"} data-type="select" value={typeWidth.size}>
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
          <input className="w-full" type="number" name={"padding"} data-sizetype={typeWidth.size} data-position='0' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["padding"] ? configTemplate["padding"][0] : ""
            } />
        </div>
        <div>
          <span>right</span>
          <input className="w-full" type="number" name={"padding"} data-sizetype={typeWidth.size} data-position='1' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["padding"] ? configTemplate["padding"][1] : ""
            } />
        </div>
        <div>
          <span>bottom</span>
          <input className="w-full" type="number" name={"padding"} data-sizetype={typeWidth.size} data-position='2' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["padding"] ? configTemplate["padding"][2] : ""
            } />
        </div>
        <div>
          <span>left</span>
          <input className="w-full" type="number" name={"padding"} data-sizetype={typeWidth.size} data-position='3' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["padding"] ? configTemplate["padding"][3] : ""
            } />
        </div>
      </div>
    </div>
  )
}

export default Padding