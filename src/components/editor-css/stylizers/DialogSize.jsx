const DialogSize = ({ toggleDialog, clickBtnDialog, dialogRef, sizeAuto,sizeType }) => {
  return (
    <>
      <button type="button" className="btn__type_size" onClick={toggleDialog}>{sizeType.size}</button>
      <dialog ref={dialogRef} className="dialog__size">
        <div className="dialog__size__btns">
          <button type="button" className="dialog__size__btn dialog__size__btn--close" onClick={clickBtnDialog}>X</button>
          {sizeAuto && <button type="button" className="dialog__size__btn dialog__size__btn--action" onClick={clickBtnDialog} data-value="auto">auto</button>}
          <button type="button" className="dialog__size__btn dialog__size__btn--action" onClick={clickBtnDialog} data-value="px">px</button>
          <button type="button" className="dialog__size__btn dialog__size__btn--action" onClick={clickBtnDialog} data-value="%">%</button>
          <button type="button" className="dialog__size__btn dialog__size__btn--action" onClick={clickBtnDialog} data-value="em">em</button>
          <button type="button" className="dialog__size__btn dialog__size__btn--action" onClick={clickBtnDialog} data-value="rem">rem</button>
          <button type="button" className="dialog__size__btn dialog__size__btn--action" onClick={clickBtnDialog} data-value="vh">vh</button>
          <button type="button" className="dialog__size__btn dialog__size__btn--action" onClick={clickBtnDialog} data-value="vw">vw</button>
        </div>
      </dialog>
    </>
  )
}

export default DialogSize