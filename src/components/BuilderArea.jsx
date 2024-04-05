import { useState, useEffect } from 'react'
import { useDragAndDropProvider } from '../hoks/useDragAndDropProvider'
import { useExportImportProvider } from '../hoks/useExportImportProvider'
import { useEditorProvider } from '../hoks/useEditorProvider'

export const BuilderArea = () => {
  const { handleDragEnter, handleDrop, itemsToTemplate, handleOver, handleLeave } = useDragAndDropProvider()
  const { builderArea } = useExportImportProvider()
  const { handleActualConfig } = useEditorProvider()
  const [components, setComponents] = useState([])

  useEffect(() => {
    setComponents(itemsToTemplate)
  }, [itemsToTemplate])


  return (
    <div ref={builderArea} className={`h-screen`} onClickCapture={() => handleActualConfig("")} onDragEnterCapture={e => handleDragEnter(e)} onDragOver={e => handleOver(e)} onDrop={e => handleDrop(e)} onDragLeave={e => handleLeave(e)}>
      {components.length > 0
        &&
        components.map((Item, indexItem) =>
          <Item.component key={Item.id} id={Item.id} indexItem={indexItem} isParentComponent={true} />)
      }
    </div>
  )
}
