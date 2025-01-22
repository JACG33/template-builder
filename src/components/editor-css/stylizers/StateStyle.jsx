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
    <div className='grid grid-cols-2 px-2 items-center'>
      <span>State</span>
      <button type="button" className="px-2 py-1 rounded-lg bg-blue-500 text-gray-50" onClick={toggleDialog}>{stateType.state == "" ? "normal" : stateType.state}</button>
      <dialog ref={dialogRef} className="rounded-lg">
        <div className="grid gap-2 p-2">
          <button type="button" className="px-2 py-1 rounded-lg bg-red-500 text-gray-50" onClick={clickBtnDialog}>X</button>
          <button type="button" className="px-2 py-1 rounded-lg bg-green-500 text-gray-50" onClick={clickBtnDialog} data-value="">normal</button>
          <button type="button" className="px-2 py-1 rounded-lg bg-green-500 text-gray-50" onClick={clickBtnDialog} data-value=":hover">hover</button>
        </div>
      </dialog>
    </div>
  )
}

export default StateStyle