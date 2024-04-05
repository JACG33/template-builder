
import { useState } from 'react'
import { ListTreeIcon } from '../svg'
import ButtonRight from '../tooltips/ButtonRight'
import SideBarElementsRendered from './SideBarElementsRendered'

const ComponentsTree = () => {
  const [openComp, setOpenComp] = useState(false)

  const handleShowComponents = () => setOpenComp(!openComp)
  return (
    <div>
      {openComp && <div className='absolute z-0 px-2 h-screen top-0 left-[50px] bg-slate-700 componets__dialog componets__dialog--show'>
        <SideBarElementsRendered />
      </div>}
      <ButtonRight text={"Components Tree"} handleShowComponents={handleShowComponents}>
        <ListTreeIcon />
      </ButtonRight>
    </div>
  )
}

export default ComponentsTree