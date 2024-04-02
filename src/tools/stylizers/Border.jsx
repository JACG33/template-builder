import { useState, useEffect, useRef } from 'react'
import SideOptions from './SideOptions'

const Border = ({ handleChange, configTemplate, configRef }) => {
  const [typeWidth, setTypeWidth] = useState({ size: "px" })
  const [split, setSplit] = useState("joined")

  const setSplitType = (splitvalue) => setSplit(splitvalue)

  const typeWidthHandleChange = (e) => {
    let data = { size: e.target.value }
    setTypeWidth(data)
    // handleChange(e)
  }
  useEffect(() => {
    if (configRef?.current?.["borderTop"] || configRef?.current?.["borderRight"] || configRef?.current?.["borderBottom"] || configRef?.current?.["borderLeft"]) {
      setSplit("separated")
    }
  }, [])

  return (
    <div>
      <div className="w-full flex items-center  gap-2 justify-between">
        <label htmlFor={"border"}>Border</label>
        <SideOptions setSplitType={setSplitType} split={split} />
        <select className="h-[21px]" onChange={typeWidthHandleChange} id={"border"} data-type="select" value={typeWidth.size}>
          <option value="px">px</option>
          <option value="em">em</option>
          <option value="rem">rem</option>
          <option value="vh">vh</option>
          <option value="vw">vw</option>
        </select>
      </div>

      {split == "joined" && <div>
        <BorderSeparated configRef={configRef} configTemplate={configTemplate} handleChange={handleChange} split={split} typeWidth={typeWidth} borderPosition={"border"} sizeUnit={typeWidth.size} />
      </div>}

      {split == "separated" && <div className="w-full grid gap-2">
        <div>
          <span>top</span>
          <BorderSeparated configRef={configRef} configTemplate={configTemplate} handleChange={handleChange} split={split} typeWidth={typeWidth} borderPosition={"borderTop"} sizeUnit={typeWidth.size} />
        </div>
        <div>
          <span>right</span>
          <BorderSeparated configRef={configRef} configTemplate={configTemplate} handleChange={handleChange} split={split} typeWidth={typeWidth} borderPosition={"borderRight"} sizeUnit={typeWidth.size} />
        </div>
        <div>
          <span>bottom</span>
          <BorderSeparated configRef={configRef} configTemplate={configTemplate} handleChange={handleChange} split={split} typeWidth={typeWidth} borderPosition={"borderBottom"} sizeUnit={typeWidth.size} />
        </div>
        <div>
          <span>left</span>
          <BorderSeparated configRef={configRef} configTemplate={configTemplate} handleChange={handleChange} split={split} typeWidth={typeWidth} borderPosition={"borderLeft"} sizeUnit={typeWidth.size} />
        </div>
      </div>}

    </div>
  )
}

const BorderSeparated = ({ handleChange, configRef, typeWidth, split, borderPosition, sizeUnit }) => {
  const borderStyles = useRef({ size: 0, style: "solid", color: "#ffffff", sizeUnit })
  const [up, setUp] = useState(true)
  const inpRef = useRef(null)
  const borderChange = (e) => {
    const { target } = e

    if (target.type == "number") {
      borderStyles.current = { ...borderStyles.current, size: target.value }
    }
    if (target.name == "selectstyle") {
      borderStyles.current = { ...borderStyles.current, style: target.value }
    }
    if (target.name == "bordercolor") {
      borderStyles.current = { ...borderStyles.current, color: target.value }
    }

    const { value, name, dataset, id } = inpRef.current
    const data = {
      value, name, dataset: { ...dataset, "borderstyle": JSON.stringify(borderStyles.current) }, id
    }

    handleChange({ target: data })
  }


  useEffect(() => {
    if (configRef?.current?.[borderPosition]) {
      let split = configRef.current[borderPosition].split(" ")
      borderStyles.current = { ...borderStyles.current, size: split[0].replace(/[a-z]+/, ""), style: split[1], color: split[2] }
      setUp(!up)
    }
  }, [])


  return (
    <div className="flex justify-between items-center">
      <input className="" ref={inpRef} type="number" name={borderPosition} data-name={borderPosition} data-sizetype={typeWidth.size} data-split={split} onChange={borderChange} min={0} max={99999}
        value={borderStyles.current.size ? borderStyles.current.size : 0} data-borderstyle={JSON.stringify(borderStyles.current)} />

      <select name="selectstyle" id="" value={borderStyles.current.style} onChange={borderChange} data-borderstyle={JSON.stringify(borderStyles.current)}>
        <option value="none">none</option>
        <option value="hidden">hidden</option>
        <option value="dotted">dotted</option>
        <option value="dashed">dashed</option>
        <option value="solid">solid</option>
        <option value="double">double</option>
        <option value="groove">groove</option>
        <option value="ridge">ridge</option>
        <option value="inset">inset</option>
        <option value="outset">outset</option>
      </select>

      <input type="color" name="bordercolor" id="" value={borderStyles.current.color} onChange={borderChange} data-borderstyle={JSON.stringify(borderStyles.current)} />
    </div>
  )
}

export default Border
