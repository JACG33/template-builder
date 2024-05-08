import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useBraeackPointProvider } from '../../hoks/useBreackPointProvider'
import { useDragAndDropProvider } from '../../hoks/useDragAndDropProvider'
import { useEditorProvider } from '../../hoks/useEditorProvider'
import { useExportImportProvider } from '../../hoks/useExportImportProvider'

export const BuilderArea = () => {
  const { handleDragEnter, handleDrop, itemsToTemplate, handleOver, handleLeave } = useDragAndDropProvider()
  const { builderArea } = useExportImportProvider()
  const { handleOpenEditor } = useEditorProvider()
  const { breackPoint, builderZoneRef, bkpoint } = useBraeackPointProvider()

  return (
    <div className='wrap__builder' ref={builderZoneRef}>
      <IFrame bkpoint={bkpoint} breackPoint={breackPoint}>
        <div ref={builderArea}
          style={{ minHeight: "100%" }}
          onClickCapture={() => handleOpenEditor({ open: false })}
          onDragEnterCapture={e => handleDragEnter(e)}
          onDragOverCapture={e => handleOver(e)}
          onDrop={e => handleDrop(e)}
          onDragLeave={e => handleLeave(e)}
        >
          {
            itemsToTemplate.length > 0
            &&
            itemsToTemplate.map((Item, indexItem) =>
              <Item.component key={Item.id} id={Item.id} indexItem={indexItem} isParentComponent={true} dataParent={Item} />)
          }
        </div>
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