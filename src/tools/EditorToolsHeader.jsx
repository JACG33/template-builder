import { useEditorProvider } from '../context/EditorProvider'
import { useDragAndDropProvider } from '../context/DragDropProvider'

const EditorToolsHeader = () => {

  const { handleOpenEditor, actualConfig } = useEditorProvider()
  const { handleDeleteComponent } = useDragAndDropProvider()

  const handleDelete = () => {
    handleDeleteComponent(actualConfig)
    handleOpenEditor({ open: false })
  }
  return (
    <>
      <div className='flex gap-2 justify-around items-center my-2'>
        <span>Component Styles</span>
        <button type='button'
          onClick={() => handleOpenEditor({ open: false })}
          className='py-1 px-2 bg-red-600 text-white hover:bg-red-500 rounded-lg'
        ><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg></button>
      </div>

      <div className='flex items-center justify-center'>
        <button type='button' className='w-full flex items-center justify-between py-1 px-2 border border-red-600 rounded-lg hover:text-white hover:bg-red-600'
          onClick={handleDelete}>
          Delete Component
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        </button>
      </div>
    </>
  )
}

export default EditorToolsHeader