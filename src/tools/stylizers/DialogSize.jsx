const DialogSize = ({ toggleDialog, clickBtnDialog, dialogRef, sizeAuto,sizeType }) => {
  return (
    <>
      <button type="button" className="w-[100px]" onClick={toggleDialog}>{sizeType.size}</button>
      <dialog ref={dialogRef} className="p-2 rounded-lg">
        <div className="grid gap-1">
          {sizeAuto && <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="auto">auto</button>}
          <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="px">px</button>
          <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="%">%</button>
          <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="em">em</button>
          <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="rem">rem</button>
          <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="vh">vh</button>
          <button type="button" className="py-1 px-2 hover:bg-slate-400" onClick={clickBtnDialog} data-value="vw">vw</button>
        </div>
      </dialog>
    </>
  )
}

export default DialogSize