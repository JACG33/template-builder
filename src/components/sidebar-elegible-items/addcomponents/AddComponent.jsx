import { useState } from 'react'
import LeftSideContainer from '../sidecontainer/LeftSideContainer'
import { PlusIcon } from '../svg'
import ButtonRight from '../tooltips/ButtonRight'
import SideBarElementsItems from './SideBarElementsItems'

const AddComponent = () => {
  const [openComp, setOpenComp] = useState(false)

  const handleShowComponents = () => setOpenComp(!openComp)
  return (
    <div>
      {openComp &&
        <LeftSideContainer handleShowComponents={handleShowComponents}>
          <SideBarElementsItems />
        </LeftSideContainer>
      }
      <ButtonRight text={"Add Component"} handleShowComponents={handleShowComponents}>
        <PlusIcon />
      </ButtonRight>
    </div>
  )
}

export default AddComponent