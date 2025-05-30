import { useRef, useState, useEffect } from "react";
import DialogSize from './DialogSize'

const FontSize = ({ handleChange, sizeName, configRef, configTemplate }) => {
  const [sizeType, setSizeType] = useState({ size: "px" })
  const dialogRef = useRef(null)
  const inp = useRef(null)

  const toggleDialog = () => {
    dialogRef.current.showModal()
  }

  const clickBtnDialog = (e) => {
    dialogRef.current.close()
    if (!e.target.dataset.value) return
    setSizeType({ size: e.target.dataset.value })

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
    <div className="grid grid-cols-2">
      <label htmlFor={`${sizeName}1`}>Font Size</label>
      <div className="grid grid-cols-[1fr_30px] border border-blue-500 rounded-lg overflow-hidden">
        {sizeType.size == "auto" ?
          <input
            className="w-full"
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
            className=""
            id={`${sizeName}1`}
            type="number"
            name={sizeName}
            value={configTemplate?.[sizeName] ? configTemplate[sizeName] : 16}
            ref={inp}
            min={0}
            max={99999}
            data-sizetype={sizeType.size}
            onChange={handleChange}
          />
        }
        <DialogSize clickBtnDialog={clickBtnDialog} dialogRef={dialogRef} sizeType={sizeType} toggleDialog={toggleDialog} />
      </div>
    </div>
  )
}

export default FontSize