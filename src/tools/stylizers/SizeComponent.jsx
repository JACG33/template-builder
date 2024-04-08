import { useRef, useState, useEffect } from "react";
import DialogSize from "./DialogSize";

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
    <div className="size__component">
      <label htmlFor={`${sizeName}1`}>{text}</label>

      <div className="size__component__input_wp">

        {sizeType.size == "auto" ?
          <input
            className=""
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
            value={configTemplate?.[sizeName] ? configTemplate[sizeName] == "auto" ? 100 : configTemplate[sizeName] : 100}
            ref={inp}
            min={0}
            max={99999}
            data-sizetype={sizeType.size}
            onChange={handleChange}
          />
        }
        
        <DialogSize clickBtnDialog={clickBtnDialog} dialogRef={dialogRef} sizeAuto={sizeAuto} sizeType={sizeType} toggleDialog={toggleDialog} />
      </div>
    </div>
  )
}

export default SizeComponent