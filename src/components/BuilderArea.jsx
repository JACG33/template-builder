import { useState, useEffect } from 'react'
import { useDragAndDropProvider } from '../hoks/useDragAndDropProvider'
import { useExportImportProvider } from '../hoks/useExportImportProvider'

export const BuilderArea = () => {
  const { handleDragEnter, handleDrop, itemsToTemplate, handleOver, handleLeave } = useDragAndDropProvider()
  const { builderArea } = useExportImportProvider()
  const [components, setComponents] = useState([])

  useEffect(() => {
    setComponents(itemsToTemplate)
  }, [itemsToTemplate])


  return (
    <div>
      <div ref={builderArea} className={`${components.length == 0 && "h-screen flex justify-center items-center"}`} onDragEnterCapture={e => handleDragEnter(e)} onDragOver={e => handleOver(e)} onDrop={e => handleDrop(e)} onDragLeave={e => handleLeave(e)}>
        {components.length > 0
          &&
          components.map((Item, indexItem) =>
            <Item.component key={Item.id} id={Item.id} indexItem={indexItem} isParentComponent={true} />)
        }
      </div>

      {/*  */}
      <div className={`${components.length > 0 && "h-[80vh]"}`} onDragEnterCapture={e => handleDragEnter(e)} onDragOver={e => handleOver(e)} onDrop={e => handleDrop(e)} onDragLeave={e => handleLeave(e)}>
      </div>
    </div>
  )
}
