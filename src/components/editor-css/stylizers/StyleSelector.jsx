import React, { useRef, useState } from 'react'
import { useEditorProvider } from '../../../hoks/useEditorProvider'
import { TrashIcon } from '../../../components/svg'

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

        <button 
          title={stateType.state == "" ? "Css Selector" : stateType.state} 
          type="button" 
          className="relative py-2 px-4 cursor-pointer max-w-[200px] rounded-lg border border-blue-500 hover:bg-blue-500 transition-all duration-300" 
          onClick={toggleDialog}
        >
          <span 
            className='absolute inset-[-13px_-13px_auto_auto] bg-blue-500 rounded-lg py-1 px-2'
          >
            {componentCssSelectors.length}
          </span>
          <span className='text-nowrap text-ellipsis overflow-hidden block'>
            {stateType.state == "" ? "Css Selector" : stateType.state}
          </span>
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
      <div className='flex justify-between gap-2'>
        <input ref={cssSelectorRef} type="text" placeholder='New Css Selector' className='rounded-lg px-2 text-gray-700' />
        <button onClick={addCssSelector} type='button' className='bg-blue-500 rounded-lg'>Add css selector</button>
      </div>
    </>
  )
}

export default StyleSelector