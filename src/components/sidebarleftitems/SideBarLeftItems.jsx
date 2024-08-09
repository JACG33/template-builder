import { useState } from "react";
import SideBarElementsRendered from "../componentstree/SideBarElementsRendered";
import LeftSideContainer from "../sidecontainer/LeftSideContainer";
import { ListTreeIcon, PlusIcon } from "../svg";
import ButtonRight from "../tooltips/ButtonRight";
import SideBarElementsItems from "../sidebar-elegible-items/addcomponents/SideBarElementsItems";

const SideBarLeftItems = () => {
  const [openComp, setOpenComp] = useState({ type: "" });

  const handleShowComponents = (type) => {
    if (openComp.type == type) setOpenComp({ type: "" });
    else setOpenComp({ type });
  };

  return (
    <>
      {openComp.type != "" && (
        <LeftSideContainer handleShowComponents={handleShowComponents}>
          {openComp.type == "addcomp" && <SideBarElementsItems />}
          {openComp.type == "tree" && <SideBarElementsRendered />}
        </LeftSideContainer>
      )}
      <div>
        <ButtonRight
          text={"Add Component"}
          handleShowComponents={handleShowComponents}
          type={"addcomp"}
        >
          <PlusIcon />
        </ButtonRight>
      </div>
      <div>
        <ButtonRight
          text={"Components Tree"}
          handleShowComponents={handleShowComponents}
          type={"tree"}
        >
          <ListTreeIcon />
        </ButtonRight>
      </div>
    </>
  );
};

export default SideBarLeftItems;
