import { useBraeackPointProvider } from '../../hoks/useBreackPointProvider'
import { useDragAndDropProvider } from '../../hoks/useDragAndDropProvider'
import { useEditorProvider } from '../../hoks/useEditorProvider'
import { useExportImportProvider } from '../../hoks/useExportImportProvider'

export const BuilderArea = () => {
  const { handleDragEnter, handleDrop, itemsToTemplate, handleOver, handleLeave } = useDragAndDropProvider()
  const { builderArea } = useExportImportProvider()
  const { handleOpenEditor } = useEditorProvider()
  const { breackPoint } = useBraeackPointProvider()

  const bkpoint = {
    "": "",
    "640px": "builder__zone--sm",
    "768px": "builder__zone--md",
    "1024px": "builder__zone--lg",
    "1280px": "builder__zone--xl",
    "1536px": "builder__zone--2xl",
  }

  return (
    <div className='wrap__builder'>
      <div ref={builderArea} className={`builder__zone ${bkpoint[breackPoint]}`} onClickCapture={() => handleOpenEditor({ open: false })} onDragEnterCapture={e => handleDragEnter(e)} onDragOver={e => handleOver(e)} onDrop={e => handleDrop(e)} onDragLeave={e => handleLeave(e)}>
        {itemsToTemplate.length > 0
          &&
          itemsToTemplate.map((Item, indexItem) =>
            <Item.component key={Item.id} id={Item.id} indexItem={indexItem} isParentComponent={true} />)
        }
      </div>
    </div>
  )
}
