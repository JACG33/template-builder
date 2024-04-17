import { XCircle } from "../svg"
import "./leftsidecontainer.css"

const LeftSideContainer = ({ children, handleShowComponents }) => {
  return (
    <>
      <div className='aside__float__left__container componets__dialog componets__dialog--show'>
        <div className="aside__float__left__container__header">
          <button type='button'
            onClick={e=>handleShowComponents("")}
            className='aside__float__left__container__header__btn'
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