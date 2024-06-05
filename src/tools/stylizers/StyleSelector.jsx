import React, { useRef, useState } from 'react'
import { useEditorProvider } from '../../hoks/useEditorProvider'
import { TrashIcon } from '../../components/svg'

const StyleSelector = ({ setState, idActualConfig = null, defaultName = "" }) => {
  const { componentCssSelectors } = useEditorProvider()
  const [stateType, setStateType] = useState({ state: "" })
  const cssSelectorRef = useRef(null)
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

  const deleteCssSelector = (e) => {
    setState({ state: e.target.closest("[data-value]").dataset.value, typeSelect: "deleteCssSelector" })
  }

  const addCssSelector = (e) => {
    if (idActualConfig == null) return
    setState({ state: cssSelectorRef.current.value == "" ? defaultName : cssSelectorRef.current.value, typeSelect: "cssSelector" })
    cssSelectorRef.current.value = null
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "5px", paddingBlock: "20px" }}>
        <button title={stateType.state == "" ? "Css Selector" : stateType.state} type="button" className="" style={{ position: "relative", padding: "5px 10px", cursor: "pointer", maxWidth: "200px" }} onClick={toggleDialog}>
          <span style={{ position: "absolute", inset: "-13px -13px auto auto", backgroundColor: "#17a8c8", padding: "3px 6px", borderRadius: "8px" }}>{componentCssSelectors.length}</span>
          <span style={{ textWrap: "nowrap", textOverflow: "ellipsis", overflow: "hidden", display: "block" }}>{stateType.state == "" ? "Css Selector" : stateType.state}</span>
        </button>
        <dialog ref={dialogRef} className="dialog__size">
          <div className="dialog__size__btns">
            <button type="button" className="dialog__size__btn dialog__size__btn--close" onClick={clickBtnDialog}>X</button>
            {componentCssSelectors.length > 0 && componentCssSelectors.map((ele, index) =>
              <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 40px", gap: "8px" }}>
                <button type="button" style={{ maxWidth: "200px", textWrap: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} className="dialog__size__btn" onClick={clickBtnDialog} data-value={`${ele}`}>{ele}</button>
                <button type="button" className="dialog__size__btn" onClick={deleteCssSelector} data-value={`${ele}`}><TrashIcon /></button>
              </div>
            )}
            {componentCssSelectors.length == 0 && <span>Sin Selectores</span>}
          </div>
        </dialog>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>
        <input ref={cssSelectorRef} type="text" placeholder='New Css Selector' />
        <button onClick={addCssSelector} >Add css selector</button>
      </div>
    </>
  )
}

export default StyleSelector