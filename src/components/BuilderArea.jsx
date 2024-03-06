import { useState } from 'react'
import { useDragAndDropProvider } from '../context/DragDropProvider'
import { useEffect } from 'react'

export const BuilderArea = () => {
  const { handleDragEnter, handleDrop, dragEnter, itemsToTemplate, handleOver, handleLeave } = useDragAndDropProvider()
  const [components, setComponents] = useState([])
  
  useEffect(() => {
    setComponents(itemsToTemplate)
  }, [itemsToTemplate])
  

  return (
    <div>

      <div>
        {components.length > 0 && components.map((Item) =>
          <Item.component key={Item.id} id={Item.id} />
        )}
      </div>

      <div className='w-full h-screen flex justify-center items-center'>
        <div className={`h-60 w-80 flex justify-center items-center border-4 border-dotted rounded-lg ${dragEnter}`} onDragEnterCapture={e => handleDragEnter(e)} onDragOver={e => handleOver(e)} onDrop={e => handleDrop(e)} onDragLeave={e => handleLeave(e)}>
          BuilderArea
        </div>
      </div>

    </div>
  )
}
