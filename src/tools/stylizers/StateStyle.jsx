import { useRef, useState } from 'react'

const StateStyle = ({ setState }) => {
  const [stateType, setStateType] = useState({ state: "normal" })
  const dialogRef = useRef(null)
  const toggleDialog = () => {
    dialogRef.current.showModal()
  }

  const clickBtnDialog = (e) => {
    dialogRef.current.close()
    if (!e.target.dataset.value) return
    setStateType({ state: e.target.dataset.value })
    setState({ state: e.target.dataset.value })
  }

  return (
    <div className='state__style'>
      <span>State</span>
      <button type="button" className="" onClick={toggleDialog}>{stateType.state == "" ? "normal" : stateType.state}</button>
      <dialog ref={dialogRef} className="dialog__size">
        <div className="dialog__size__btns">
          <button type="button" className="dialog__size__btn dialog__size__btn--close" onClick={clickBtnDialog}>X</button>
          <button type="button" className="dialog__size__btn" onClick={clickBtnDialog} data-value="">normal</button>
          <button type="button" className="dialog__size__btn" onClick={clickBtnDialog} data-value=":hover">hover</button>
        </div>
      </dialog>
    </div>
  )
}

export default StateStyle