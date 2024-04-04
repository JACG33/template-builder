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
    <div className='p-2 border-b-2 flex justify-between items-center'>
      <span>State</span>
      <button type="button" className="w-[100px] border rounded-lg flex items-center justify-center" onClick={toggleDialog}>{stateType.state==""?"normal":stateType.state}</button>
      <dialog ref={dialogRef} className="p-2 rounded-lg">
        <div className="grid gap-1">
          <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="">normal</button>
          <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value=":hover">hover</button>
        </div>
      </dialog>
    </div>
  )
}

export default StateStyle