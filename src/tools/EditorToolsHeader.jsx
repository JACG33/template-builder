import { useEditorProvider } from '../hoks/useEditorProvider'

const EditorToolsHeader = () => {
  const { handleOpenEditor } = useEditorProvider()

  return (
    <>
      <div className='flex gap-2 justify-around items-center my-2'>
        <span>Component Styles</span>
        <button type='button'
          onClick={() => handleOpenEditor({ open: false })}
          className='py-1 px-2 bg-red-600 text-white hover:bg-red-500 rounded-lg'
        ><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg></button>
      </div>
    </>
  )
}

export default EditorToolsHeader