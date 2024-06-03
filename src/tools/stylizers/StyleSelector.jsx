import React from 'react'
import { useEditorProvider } from '../../hoks/useEditorProvider'
import { useRef, useState } from 'react'

const StyleSelector = ({ setState }) => {
  const { componentCssSelectors } = useEditorProvider()
  const [stateType, setStateType] = useState({ state: "" })
  const dialogRef = useRef(null)
  const toggleDialog = () => {
    dialogRef.current.showModal()
  }

  const clickBtnDialog = (e) => {
    dialogRef.current.close()
    if (!e.target.dataset.value) return
    setStateType({ state: e.target.dataset.value })
    setState({ state: e.target.dataset.value, typeSelect: "cssSelector" })
  }

  return (
    <div className='state__style'>
      <span>Css Selector</span>
      <button type="button" className="" style={{ textWrap: "nowrap", textOverflow: "ellipsis", overflow: "hidden", paddingInline: "2px" }} onClick={toggleDialog}>
        {stateType.state == "" ? "" : stateType.state}
      </button>
      <dialog ref={dialogRef} className="dialog__size">
        <div className="dialog__size__btns">
          <button type="button" className="dialog__size__btn dialog__size__btn--close" onClick={clickBtnDialog}>X</button>
          {componentCssSelectors.length > 0 && componentCssSelectors.map((ele, index) =>
            <button key={index} type="button" className="dialog__size__btn" onClick={clickBtnDialog} data-value={`${ele}`}>{ele}</button>
          )}
          {componentCssSelectors.length == 0 && <span>Sin Selectores</span>}
        </div>
      </dialog>
    </div>
  )
}

export default StyleSelector