
import { useState } from 'react'
import { ListTreeIcon } from '../svg'
import ButtonRight from '../tooltips/ButtonRight'
import SideBarElementsRendered from './SideBarElementsRendered'
import LeftSideContainer from '../sidecontainer/LeftSideContainer'

const ComponentsTree = () => {
  const [openComp, setOpenComp] = useState(false)

  const handleShowComponents = () => setOpenComp(!openComp)
  return (
    <div>
      {openComp &&
        <LeftSideContainer handleShowComponents={handleShowComponents}>
          <SideBarElementsRendered />
        </LeftSideContainer>
      }
      <ButtonRight text={"Components Tree"} handleShowComponents={handleShowComponents}>
        <ListTreeIcon />
      </ButtonRight>
    </div>
  )
}

export default ComponentsTree