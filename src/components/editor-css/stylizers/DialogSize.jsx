const DialogSize = ({ toggleDialog, clickBtnDialog, dialogRef, sizeAuto,sizeType }) => {
  return (
    <>
      <button type="button" className="bg-blue-500 cursor-pointer" onClick={toggleDialog}>{sizeType.size}</button>
      <dialog ref={dialogRef} className="p-2 rounded-lg m-auto" closedBy="any">
        <div className="grid gap-2">
          <button type="button" className="bg-red-500 rounded-lg text-gray-50 py-1 px-2 cursor-pointer" onClick={clickBtnDialog}>X</button>
          {sizeAuto && <button type="button" className="bg-green-500 rounded-lg text-gray-50 py-1 px-2 cursor-pointer" onClick={clickBtnDialog} data-value="auto">auto</button>}
          <button type="button" className="bg-green-500 rounded-lg text-gray-50 py-1 px-2 cursor-pointer" onClick={clickBtnDialog} data-value="px">px</button>
          <button type="button" className="bg-green-500 rounded-lg text-gray-50 py-1 px-2 cursor-pointer" onClick={clickBtnDialog} data-value="%">%</button>
          <button type="button" className="bg-green-500 rounded-lg text-gray-50 py-1 px-2 cursor-pointer" onClick={clickBtnDialog} data-value="em">em</button>
          <button type="button" className="bg-green-500 rounded-lg text-gray-50 py-1 px-2 cursor-pointer" onClick={clickBtnDialog} data-value="rem">rem</button>
          <button type="button" className="bg-green-500 rounded-lg text-gray-50 py-1 px-2 cursor-pointer" onClick={clickBtnDialog} data-value="vh">vh</button>
          <button type="button" className="bg-green-500 rounded-lg text-gray-50 py-1 px-2 cursor-pointer" onClick={clickBtnDialog} data-value="vh">dvh</button>
          <button type="button" className="bg-green-500 rounded-lg text-gray-50 py-1 px-2 cursor-pointer" onClick={clickBtnDialog} data-value="vw">vw</button>
          <button type="button" className="bg-green-500 rounded-lg text-gray-50 py-1 px-2 cursor-pointer" onClick={clickBtnDialog} data-value="vw">dvw</button>
        </div>
      </dialog>
    </>
  )
}

export default DialogSize