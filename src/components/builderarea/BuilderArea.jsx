import { DragOverlay, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useBraeackPointProvider } from '../../hoks/useBreackPointProvider'
import { useDragAndDropProvider } from '../../hoks/useDragAndDropProvider'
import { useEditorProvider } from '../../hoks/useEditorProvider'
import { MoldeElementOverlay } from '../sidebarelementsitems/MoldeElement'

export const BuilderArea = () => {
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
    <iframe ref={setRef} data-iframe="builder" className={`builder__zone ${bkpoint[breackPoint]}`}>
      {head && createPortal(<style>{cssStylesSheetRef.current}</style>, head)}
      {container && createPortal(children, container)}
    </iframe>
  );
}


function WrapperComponent({ }) {
  const { parentElements, handleDragEnd } = useDragAndDropProvider()
  const { handleOpenEditor } = useEditorProvider()
  useDndMonitor({
    onDragEnd: (e) => {
      handleDragEnd(e)
    }
  })


  const builderDroppable = useDroppable({
    id: "builderArea", data: {
      typeElement: "builderArea",
      overArea: true
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
        {
          parentElements.length > 0
          &&
          parentElements.map((Item, indexItem) =>
            <Item.component key={Item.id} id={Item.id} indexItem={indexItem} isParentComponent={true} dataParent={Item} />)
        }
      </div>
      <DragOverlayWrapper />
    </>
  )
}
function DragOverlayWrapper({ }) {
  const [draggin, setDraggin] = useState(null)

  let node = <div
    style={{
      background: "#ccc",
      textAlign: "center",
      borderRadius: "8px",
      padding: "1px 6px",
      opacity: ".5"
    }}
  >Draggin</div>

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