import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useBraeackPointProvider } from '../../hoks/useBreackPointProvider'
import { useDragAndDropProvider } from '../../hoks/useDragAndDropProvider'
import { useEditorProvider } from '../../hoks/useEditorProvider'
// import { useExportImportProvider } from '../../hoks/useExportImportProvider'
import { DragOverlay, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { MoldeElementOverlay } from '../sidebarelementsitems/MoldeElement'

export const BuilderArea = () => {
  // const { builderArea } = useExportImportProvider()
  const { breackPoint, builderZoneRef, bkpoint } = useBraeackPointProvider()

  return (
    <div className='wrap__builder' ref={builderZoneRef}>
      <IFrame bkpoint={bkpoint} breackPoint={breackPoint}>
        <WrapperComponent />
      </IFrame>
    </div>
  )
}

function IFrame({ children, bkpoint, breackPoint }) {
  const [ref, setRef] = useState();
  const container = ref?.contentWindow?.document?.body;
  const head = ref?.contentWindow?.document?.head

  const { cssStylesSheetRef } = useEditorProvider()

  return (
    <iframe ref={setRef} className={`builder__zone ${bkpoint[breackPoint]}`}>
      {head && createPortal(<style>{cssStylesSheetRef.current}</style>, head)}
      {container && createPortal(children, container)}
    </iframe>
  );
}


function WrapperComponent({ }) {
  const { itemsToTemplate, handleDragEnd } = useDragAndDropProvider()
  const { handleOpenEditor } = useEditorProvider()
  useDndMonitor({
    onDragEnd: (e) => {
      // console.log("fin", e);
      handleDragEnd(e)
    },
    onDragOver: (e) => {
      // console.log("over", e);
    }
  })


  const builderDroppable = useDroppable({
    id: "builderArea", data: {
      typeElement: "builderArea"
    }
  })

  return (
    <>
      <div
        ref={builderDroppable.setNodeRef}
        {...builderDroppable.listeners}
        {...builderDroppable.attributes}


        data-builderarea="builderArea"
        style={{
          minHeight: "100%",
          backgroundImage: builderDroppable.isOver ? "linear-gradient(0deg, #8e8e8e6b, transparent)" : "",
          border: builderDroppable.isOver ? "2px dashed green" : ""
        }}

        onClickCapture={() => handleOpenEditor({ open: false })}
      >
        <DragOverlayWrapper />
        {
          itemsToTemplate.length > 0
          &&
          itemsToTemplate.map((Item, indexItem) =>
            <Item.component key={Item.id} id={Item.id} indexItem={indexItem} isParentComponent={true} dataParent={Item} />)
        }
      </div>
    </>
  )
}
function DragOverlayWrapper({ }) {
  const [draggin, setDraggin] = useState(null)

  let node = <div style={{border:"1px solid white",background:"#ccc",textAlign:"center",borderRadius:"8px",padding:"3px 6px",opacity: ".5"}}>Draggin</div>

  useDndMonitor({
    onDragStart: (e) => {
      setDraggin(e.active)
    },
    onDragCancel: (e) => {
      setDraggin(null)
    },
    onDragEnd: (e) => {
      setDraggin(null)
    }
  })
  if (draggin?.data.current?.sideBar == true) {
    node = <MoldeElementOverlay htmlType={draggin?.data.current?.typehtml} />
  }
  return <DragOverlay>{node}</DragOverlay>
}