import { useRef, useState, useEffect } from "react";

const SizeComponent = ({ text, handleChange, configTemplate, sizeName }) => {
  const [typeWidth, setTypeWidth] = useState({ size: "auto", type: "text", value: "auto" })
  const inp = useRef(null)

  const typeWidthHandleChange = (e) => {
    let data = {
      size: e.target.value,
      type: "text",
      value: "auto"
    }
    if (e.target.value == "auto") {
      inp.current.type = "text"
      inp.current.value = null
      inp.current.value = "auto"
    }
    if (e.target.value !== "auto") {
      data.type = "number"
      data.value = null
    }
    setTypeWidth(data)
  }

  useEffect(() => {
    const { name, dataset, value, id } = inp.current
    const target = {
      name,
      dataset,
      value,
      id,
    }
    const data = { target }
    handleChange(data)
  }, [typeWidth])


  return (
    <div className="w-full flex justify-between gap-2">
      <label>{text}</label>
      <div className="flex items-center justify-center">
        {typeWidth.value == "auto" ?
          <input className="w-12" ref={inp} type={typeWidth.type} name={sizeName} data-sizetype={typeWidth.size} onChange={handleChange} value="auto" />
          :
          <input className="w-12" ref={inp} type={typeWidth.type} name={sizeName} data-sizetype={typeWidth.size} onChange={handleChange} min={0} max={99999}
            value={
              configTemplate?.[sizeName] ? configTemplate[sizeName] == "auto" ? "100" : configTemplate[sizeName] : "100"
            } />
        }
        <select onChange={typeWidthHandleChange} name={sizeName} data-type="select" value={typeWidth.size}>
          <option value="auto">-</option>
          <option value="%">%</option>
          <option value="px">px</option>
          <option value="em">em</option>
          <option value="rem">rem</option>
        </select>
      </div>
    </div>
  )
}

export default SizeComponent