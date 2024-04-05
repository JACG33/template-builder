import { PlusIcon } from '../svg'
import { useState } from 'react'
import SideBarElementsItems from './SideBarElementsItems'
import ButtonRight from '../tooltips/ButtonRight'

const AddComponent = () => {
  const [openComp, setOpenComp] = useState(false)

  const handleShowComponents = () => setOpenComp(!openComp)
  return (
    <div>
      {openComp && <div className='absolute z-0 px-2 h-screen top-0 left-[50px] bg-slate-700 componets__dialog componets__dialog--show'>
        <SideBarElementsItems />
      </div>}
      <ButtonRight text={"Add Component"} handleShowComponents={handleShowComponents}>
        <PlusIcon />
      </ButtonRight>
    </div>
  )
}

export default AddComponent