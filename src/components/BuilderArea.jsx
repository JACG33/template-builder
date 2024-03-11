import { useState,useEffect } from 'react'
import { useDragAndDropProvider } from '../context/DragDropProvider'

export const BuilderArea = () => {
  const { handleDragEnter, handleDrop, dragEnter, itemsToTemplate, handleOver, handleLeave } = useDragAndDropProvider()
  const [components, setComponents] = useState([])

  useEffect(() => {
    setComponents(itemsToTemplate)
  }, [itemsToTemplate])


  return (
    <div>
      <div className={`${components.length == 0 && "h-screen flex justify-center items-center"} ${dragEnter}`} onDragEnterCapture={e => handleDragEnter(e)} onDragOver={e => handleOver(e)} onDrop={e => handleDrop(e)} onDragLeave={e => handleLeave(e)}>
        {components.length > 0
          ?
          components.map((Item) =>
            <Item.component key={Item.id} id={Item.id} />)
          :
          <span className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
            Drag Element
          </span>}
      </div>

      {/*  */}
      <div className={`${components.length > 0 && "h-[80vh]"} ${dragEnter}`} onDragEnterCapture={e => handleDragEnter(e)} onDragOver={e => handleOver(e)} onDrop={e => handleDrop(e)} onDragLeave={e => handleLeave(e)}>
      </div>
    </div>
  )
}
