import { useRef, useState, useEffect } from "react";

const SizeComponent = ({ text, handleChange, configTemplate, sizeName, configRef, sizeAuto = false }) => {
  const [sizeType, setSizeType] = useState({ size: "px" })
  const dialogRef = useRef(null)
  const inp = useRef(null)

  const toggleDialog = () => {
    dialogRef.current.showModal()
  }

  const clickBtnDialog = (e) => {
    setSizeType({ size: e.target.dataset.value })
    dialogRef.current.close()

    const { value, name, dataset, id } = inp.current
    const target = {
      value, name, dataset: { ...dataset, sizetype: e.target.dataset.value }, id
    }
    handleChange({ target })
  }
  useEffect(() => {
    if (configRef?.current?.[sizeName]) {
      let size = configRef.current[sizeName].replace(/[0-9]+/, "")
      setSizeType({ size })
    }
  }, [])

  return (
    <div className="w-full flex justify-between gap-2 py-2">
      <label htmlFor={`${sizeName}1`}>{text}</label>

      <div className="max-w-[100px] relative py-1 px-2 flex items-center justify-center bg-white text-black">

        {sizeType.size == "auto" ?
          <input
            className="w-14 bg-transparent outline-none"
            id={`${sizeName}1`}
            type="text"
            name={sizeName}
            value="auto"
            ref={inp}
            data-sizetype={sizeType.size}
            onChange={handleChange}
          />
          :
          <input
            className="w-14 bg-transparent outline-none"
            id={`${sizeName}1`}
            type="number"
            name={sizeName}
            value={configTemplate?.[sizeName] ? configTemplate[sizeName] == "auto" ? 100 : configTemplate[sizeName] : 100}
            ref={inp}
            min={0}
            max={99999}
            data-sizetype={sizeType.size}
            onChange={handleChange}
          />
        }

        <button type="button" onClick={toggleDialog}>{sizeType.size}</button>
        <dialog ref={dialogRef} className="p-2 rounded-lg">
          <div className="grid gap-1">
            {sizeAuto && <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="auto">auto</button>}
            <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="px">px</button>
            <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="%">%</button>
            <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="em">em</button>
            <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="rem">rem</button>
            <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="vh">vh</button>
            <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="vw">vw</button>
          </div>
        </dialog>
      </div>
    </div>
  )
}

export default SizeComponent