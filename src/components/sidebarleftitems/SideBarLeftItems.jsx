import { useState, Suspense, lazy } from "react";
import SideBarElementsRendered from "../componentstree/SideBarElementsRendered";
import LeftSideContainer from "../sidecontainer/LeftSideContainer";
import { ListTreeIcon, PlusIcon } from "../svg";
import ButtonRight from "../tooltips/ButtonRight";
import SideBarElementsItems from "../sidebar-elegible-items/addcomponents/SideBarElementsItems";
import { Loader } from "../Loader/Loader";
const DialogExport = lazy(() => import("../dialogExport/DialogExport"))

const SideBarLeftItems = () => {
  const [openComp, setOpenComp] = useState({ type: "" });

  const handleShowComponents = (type) => {
    if (openComp.type == type) setOpenComp({ type: "" });
    else setOpenComp({ type });
  };

  return (
    <aside className='absolute z-10 inset-[20px_auto_20px_10px] h-11/12 overflow-y-auto overflow-x-hidden rounded-xl shadow-lg bg-gray-700 text-white flex transition-all duration-500'>
      <div className="">  
        <Suspense fallback={<Loader size={"md"} />}>
          <DialogExport />
        </Suspense>
        
        <ButtonRight
          text={"Add Component"}
          handleShowComponents={handleShowComponents}
          type={"addcomp"}
        >
          <PlusIcon />
        </ButtonRight>
        
        <ButtonRight
          text={"Components Tree"}
          handleShowComponents={handleShowComponents}
          type={"tree"}
        >
          <ListTreeIcon />
        </ButtonRight>
      </div>
      {openComp.type != "" && (
        <LeftSideContainer handleShowComponents={handleShowComponents}>
          {openComp.type == "addcomp" && <SideBarElementsItems />}
          {openComp.type == "tree" && <SideBarElementsRendered />}
        </LeftSideContainer>
      )}
    </aside>
  );
};

export default SideBarLeftItems;
