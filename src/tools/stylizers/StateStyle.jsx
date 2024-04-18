import { useRef, useState } from 'react'

const StateStyle = ({ setState}) => {
  const [stateType, setStateType] = useState({ state: "normal" })
  const dialogRef = useRef(null)
  const toggleDialog = () => {
    dialogRef.current.showModal()
  }

  const clickBtnDialog = (e) => {
    setStateType({ state: e.target.dataset.value })
    setState(e.target.dataset.value)
    dialogRef.current.close()
  }

  return (
    <div className='state__style'>
      <span>State</span>
      <button type="button" className="" onClick={toggleDialog}>{stateType.state==""?"normal":stateType.state}</button>
      <dialog ref={dialogRef} className="dialog__size">
        <div className="dialog__size__btns">
          <button type="button" className="dialog__size__btn" onClick={clickBtnDialog} data-value="">normal</button>
          <button type="button" className="dialog__size__btn" onClick={clickBtnDialog} data-value=":hover">hover</button>
        </div>
      </dialog>
    </div>
  )
}

export default StateStyle