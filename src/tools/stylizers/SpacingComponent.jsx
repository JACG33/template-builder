import { useState, useEffect, useRef } from "react";
import DialogSize from "./DialogSize";

const SpacingComponent = ({ text, handleChange, configTemplate, sizeName, configRef, sizeAuto = false, positionText, positionNumber }) => {
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
      let size = configRef.current[sizeName].split(" ")[0].replace(/[0-9]+/, "")
      setSizeType({ size })
    }
  }, [])

  return (
    <div className="size__component">
      <label htmlFor={`${sizeName}${positionNumber}`}>{text} {positionText}</label>

      <div className="size__component__input_wp">

        {sizeType.size == "auto" ?
          <input
            className=""
            id={`${sizeName}${positionNumber}`}
            type="text"
            name={sizeName}
            data-position={positionNumber}
            value="auto"
            ref={inp}
            data-sizetype={sizeType.size}
            onChange={handleChange}
          />
          :
          <input
            className=""
            id={`${sizeName}${positionNumber}`}
            type="number"
            name={sizeName}
            data-position={positionNumber}
            value={configTemplate?.[sizeName] ? configTemplate[sizeName][positionNumber] == "auto" ? 0 : configTemplate[sizeName][positionNumber] : 0}
            ref={inp}
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

export default SpacingComponent