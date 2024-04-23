import { useBraeackPointProvider } from '../../hoks/useBreackPointProvider'
import { useDragAndDropProvider } from '../../hoks/useDragAndDropProvider'
import { useEditorProvider } from '../../hoks/useEditorProvider'
import { useExportImportProvider } from '../../hoks/useExportImportProvider'

export const BuilderArea = () => {
  const { handleDragEnter, handleDrop, itemsToTemplate, handleOver, handleLeave } = useDragAndDropProvider()
  const { builderArea } = useExportImportProvider()
  const { handleOpenEditor } = useEditorProvider()
  const { breackPoint, builderZoneRef } = useBraeackPointProvider()

  const bkpoint = {
    "": "",
    "mobile": "builder__zone--mobile",
    "mobilex2": "builder__zone--mobile2",
    "tablet": "builder__zone--tablet",
    "desktop": "builder__zone--desktop",
    "desktopx2": "builder__zone--desktopx2",
    "desktopx3": "builder__zone--desktopx3",
  }

  return (
    <div className='wrap__builder' ref={builderZoneRef}>
      <div ref={builderArea} className={`builder__zone ${bkpoint[breackPoint]}`}
        onClickCapture={() => handleOpenEditor({ open: false })}
        onDragEnterCapture={e => handleDragEnter(e)}
        onDragOver={e => handleOver(e)}
        onDrop={e => handleDrop(e)}
        onDragLeave={e => handleLeave(e)}
      >
        {itemsToTemplate.length > 0
          &&
          itemsToTemplate.map((Item, indexItem) =>
            <Item.component key={Item.id} id={Item.id} indexItem={indexItem} isParentComponent={true} />)
        }
      </div>
      {/* <iframe src='http://localhost:5173/tmp.html'></iframe> */}
    </div>
  )
}
