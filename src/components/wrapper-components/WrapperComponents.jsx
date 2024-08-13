import { useState } from 'react'
import "./wrappercomponents.css"

export const WrapperComponents = ({ children, secctionName }) => {
  const [openSection, setopenSection] = useState(false)
  const handleOpen = () => setopenSection(!openSection)
  return (
    <div className={`wrapper__component`}>
      <div className='wrapper__component__header' onClick={handleOpen}>
        <span className='wrapper__component__header__span'>{secctionName}</span>
        {/* <button type="button" className='wrapper__component__header__btn py-1 px-2 rounded-lg'> */}
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-caret-down" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 10l6 6l6 -6h-12" /></svg>
        {/* </button> */}
      </div>

      <div className={`wrapper__component__items ${openSection == true ? "wrapper__component__items--show" : ""}`}>
        {children}
      </div>
    </div>
  )
}
