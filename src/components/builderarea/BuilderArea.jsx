import { DragOverlay, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { makeScriptsStructure } from "../../helpers/makeScriptsStructure";
import { useDragAndDropProvider } from "../../hoks/useDragAndDropProvider";
import { useEditorProvider } from "../../hoks/useEditorProvider";
import { MoldeElementOverlay } from "../sidebar-elegible-items/elegible-list/MoldeElement";

export const BuilderArea = () => {
  const { breackPoint, builderZoneRef, bkpoint } = useEditorProvider();

  return (
    <div className="w-full h-screen flex flex-col" ref={builderZoneRef}>
      <IFrame bkpoint={bkpoint} breackPoint={breackPoint}>
        <WrapperComponent />
      </IFrame>
    </div>
  );
};

function IFrame({ children, bkpoint, breackPoint }) {
  const { cssStylesSheetRef, scripstRef } = useEditorProvider();
  const [ref, setRef] = useState();
  const [refresh, setRefresh] = useState(false);

  const container = ref?.contentWindow?.document?.body;
  const head = ref?.contentWindow?.document?.head;

  useEffect(() => {
    if (Object.keys(scripstRef.current).length > 0) {
      ref?.contentWindow?.document.location.reload();
      setRefresh(!refresh);
    }
  }, [scripstRef.current]);

  const tagScript = document.createElement("script");
  tagScript.type = "module";
  tagScript.dataset.script = "true";
  if (scripstRef.current) {
    let textScript = makeScripsBody({ scripts: scripstRef.current });
    tagScript.textContent = textScript;
  }
  if (!container?.querySelector("[data-script]"))
    container?.insertAdjacentElement("beforeend", tagScript);
  else {
    container.querySelector("[data-script]").textContent = null;
    if (scripstRef.current) {
      let textScript = makeScripsBody({ scripts: scripstRef.current });
      container.querySelector("[data-script]").textContent = textScript;
    }
  }

  return (
    <iframe
      ref={setRef}
      data-iframe="builder"
      className={`h-screen builder__zone ${bkpoint[breackPoint]}`}
    >
      {refresh && (
        <>
          {head &&
            createPortal(<style>{cssStylesSheetRef.current}</style>, head)}
          {container && createPortal(children, container)}
        </>
      )}
      {!refresh && (
        <>
          {head &&
            createPortal(<style>{cssStylesSheetRef.current}</style>, head)}
          {container && createPortal(children, container)}
        </>
      )}
    </iframe>
  );
}

function WrapperComponent({}) {
  const { parentElements, handleDragEnd } = useDragAndDropProvider();
  const { handleOpenEditor } = useEditorProvider();
  useDndMonitor({
    onDragEnd: (e) => {
      handleDragEnd(e);
    },
  });

  const builderDroppable = useDroppable({
    id: "builderArea",
    data: {
      typeElement: "builderArea",
      overArea: true,
    },
  });

  return (
    <>
      <div
        ref={builderDroppable.setNodeRef}
        {...builderDroppable.listeners}
        {...builderDroppable.attributes}
        data-builderarea="builderArea"
        style={{
          minHeight: "100%",
          backgroundImage: builderDroppable.isOver
            ? "linear-gradient(0deg, #8e8e8e6b, transparent)"
            : "",
          border: builderDroppable.isOver ? "2px dashed green" : "",
        }}
        onClickCapture={() => handleOpenEditor({ open: false })}
      >
        {parentElements.length > 0 &&
          parentElements.map((Item) => (
            <Item.component
              key={Item.id}
              id={Item.id}
              styles={Item?.styles}
              dataParent={Item}
              moreParams={Item?.moreParams}
              cssSelector={Item.otherCssClases}
              innerText={Item?.innerText}
            />
          ))}
        <DragOverlayWrapper />
      </div>
    </>
  );
}

function DragOverlayWrapper({}) {
  const [draggin, setDraggin] = useState(null);
  const { dragginComponent, hdlDragginComponent } = useDragAndDropProvider();

  let node = (
    <div
      style={{
        background: "#ccc",
        textAlign: "center",
        borderRadius: "8px",
        padding: "1px 6px",
        opacity: ".5",
      }}
    >
      Draggin
    </div>
  );

  useDndMonitor({
    onDragStart: (e) => {
      setDraggin(e.active);
    },
    onDragMove: (e) => {
      if (dragginComponent == false) hdlDragginComponent(true);
    },
    onDragCancel: (e) => {
      setDraggin(null);
      if (dragginComponent == true) hdlDragginComponent(false);
    },
    onDragEnd: (e) => {
      setDraggin(null);
      if (dragginComponent == true) hdlDragginComponent(false);
    },
  });
  if (draggin?.data.current?.sideBar == true) {
    node = <MoldeElementOverlay htmlType={draggin?.data.current?.typehtml} />;
  }
  return <DragOverlay>{node}</DragOverlay>;
}

const makeScripsBody = ({ scripts }) =>
  makeScriptsStructure({ script: scripts });
