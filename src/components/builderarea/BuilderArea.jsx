import { useDragAndDropProvider } from '../../hoks/useDragAndDropProvider'
import { useEditorProvider } from '../../hoks/useEditorProvider'
import { useExportImportProvider } from '../../hoks/useExportImportProvider'
import "./builderarea.css"

export const BuilderArea = () => {
  const { handleDragEnter, handleDrop, itemsToTemplate, handleOver, handleLeave } = useDragAndDropProvider()
  const { builderArea } = useExportImportProvider()
  const { handleActualConfig } = useEditorProvider()

  return (
    <div ref={builderArea} className="builder__zone" onClickCapture={() => handleActualConfig("")} onDragEnterCapture={e => handleDragEnter(e)} onDragOver={e => handleOver(e)} onDrop={e => handleDrop(e)} onDragLeave={e => handleLeave(e)}>
      {itemsToTemplate.length > 0
        &&
        itemsToTemplate.map((Item, indexItem) =>
          <Item.component key={Item.id} id={Item.id} indexItem={indexItem} isParentComponent={true} />)
      }
    </div>
  )
}
