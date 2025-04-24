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
  const [iframeRef, setIframeRef] = useState(null);

  useEffect(() => {
    if (iframeRef && scripstRef.current) {
      const container = iframeRef.contentWindow.document.body;
      const keyListner = Object.keys(scripstRef.current)

      // Obtener todos los scripts ya existentes
      const existingScripts = container.querySelectorAll("[data-id]");
      existingScripts.forEach((scriptElement) => {
        const scriptId = scriptElement.getAttribute("data-id");
        // Si el script ya no está en scripstRef, remuévelo

        keyListner.forEach((key) => {
          if (!scripstRef.current[key][scriptId.replace("script-", "")]) {
            scriptElement.remove();
          }
        })
      });

      keyListner.forEach((keyName) => {
        // Inyectar o actualizar scripts actuales
        if (scripstRef.current[keyName]) {
          Object.entries(scripstRef.current[keyName]).forEach(([key, script]) => {
            const scriptId = `script-${key}`;
            let scriptElement = container.querySelector(`[data-id="${scriptId}"]`);
            if (scriptElement) {
              scriptElement.textContent = makeScriptsStructure({ type: keyName, logic: script[keyName] })
            } else {
              scriptElement = document.createElement("script");
              scriptElement.dataset.id = scriptId;
              scriptElement.textContent = makeScriptsStructure({ type: keyName, logic: script[keyName] })
           
              container.appendChild(scriptElement);
            }
          });
        }
      })
    }
  }, [scripstRef.current, iframeRef]);


  const head = iframeRef?.contentWindow?.document?.head;
  const container = iframeRef?.contentWindow?.document?.body;

  return (
    <iframe
      ref={setIframeRef}
      data-iframe="builder"
      className={`h-screen builder__zone ${bkpoint[breackPoint]}`}
    >
      {head &&
        createPortal(
          <style>{cssStylesSheetRef.current}</style>,
          head
        )}
      {container &&
        createPortal(children, container)}
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