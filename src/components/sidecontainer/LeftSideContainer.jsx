import { XCircle } from "../svg"
import "./leftsidecontainer.css"

const LeftSideContainer = ({ children, handleShowComponents }) => {
  return (
    <>
      <div className='aside__float__left__container absolute z-0 px-2 h-screen top-0 left-[50px] bg-slate-700 componets__dialog componets__dialog--show'>
        <div className="flex justify-end aside__float__left__container__header">
          <button type='button'
            onClick={handleShowComponents}
            className='py-1 px-2 bg-red-600 text-white hover:bg-red-500 rounded-lg aside__float__left__container__header__btn'
          >
            <XCircle />
          </button>
        </div>
        {children}
      </div>
    </>
  )
}

export default LeftSideContainer