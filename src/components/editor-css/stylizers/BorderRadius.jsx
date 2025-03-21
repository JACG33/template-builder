import { useState, useEffect, useRef } from 'react'
import SideOptions from './SideOptions'

const BorderRadius = ({ handleChange, configTemplate, configRef }) => {
  const [typeWidth, setTypeWidth] = useState({ size: "px" })
  const [split, setSplit] = useState("joined")

  const setSplitType = (splitvalue) => setSplit(splitvalue)

  const typeWidthHandleChange = (e) => {
    let data = { size: e.target.value }
    setTypeWidth(data)
    handleChange(e)
  }

  useEffect(() => {
    if (configRef?.current?.["borderRadius"]) {
      let size = configRef.current["borderRadius"].split(" ")[0].replace(/[0-9]+/, "")
      if (size != "auto") setTypeWidth({ size })
      if (configRef.current["borderRadius"].split(" ").length > 1) setSplit("separated")
    }
  }, [])


  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-3">
        <label htmlFor={"borderRadius1"}>Border Radius</label>
        <SideOptions setSplitType={setSplitType} split={split} />
        <select className="rounded-lg p-2 border border-gray-100 bg-gray-700 text-gray-100 cursor-pointer" onChange={typeWidthHandleChange} id={"borderRadius1"} name={"borderRadius"} data-type="select" value={typeWidth.size}>
          <option value="px">px</option>
          <option value="%">%</option>
          <option value="em">em</option>
          <option value="rem">rem</option>
          <option value="vh">vh</option>
          <option value="vw">vw</option>
        </select>
      </div>
      {split == "joined" && <div className="padding__joined">
        <input type="number" className='w-full rounded-lg border border-gray-100 text-gray-100 px-2 py-1' name="borderRadius" data-sizetype={typeWidth.size} min={0} max={10000} data-split={split} data-position='0' onChange={handleChange} value={configTemplate?.borderRadius ? configTemplate.borderRadius[0] : 0} />
      </div>}

      {split == "separated" && <div className="grid gap-2">
        <div className='grid grid-cols-2'>
          <span>top</span>
          <input className="w-full rounded-lg border border-gray-100 text-gray-100 px-2 py-1" type="number" name={"borderRadius"} data-sizetype={typeWidth.size} data-split={split} data-position='0' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["borderRadius"]?.[0] ? configTemplate["borderRadius"][0] : ""
            } />
        </div>
        <div className='grid grid-cols-2'>
          <span>right</span>
          <input className="w-full rounded-lg border border-gray-100 text-gray-100 px-2 py-1" type="number" name={"borderRadius"} data-sizetype={typeWidth.size} data-split={split} data-position='1' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["borderRadius"]?.[1] ? configTemplate["borderRadius"][1] : ""
            } />
        </div>
        <div className='grid grid-cols-2'>
          <span>bottom</span>
          <input className="w-full rounded-lg border border-gray-100 text-gray-100 px-2 py-1" type="number" name={"borderRadius"} data-sizetype={typeWidth.size} data-split={split} data-position='2' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["borderRadius"]?.[2] ? configTemplate["borderRadius"][2] : ""
            } />
        </div>
        <div className='grid grid-cols-2'>
          <span>left</span>
          <input className="w-full rounded-lg border border-gray-100 text-gray-100 px-2 py-1" type="number" name={"borderRadius"} data-sizetype={typeWidth.size} data-split={split} data-position='3' onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.["borderRadius"]?.[3] ? configTemplate["borderRadius"][3] : ""
            } />
        </div>
      </div>}
    </div>
  )
}

export default BorderRadius