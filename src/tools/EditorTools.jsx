import { useEffect } from 'react'
import { useState } from 'react'
import { useEditorProvider } from '../context/EditorProvider'
import { useDragAndDropProvider } from '../context/DragDropProvider'

const CONFIG = {
  padding: [0, 0, 0, 0]
}

const EditorTools = () => {
  const [configTemplate, setConfigTemplate] = useState(CONFIG)
  const { configComponent, handleEditComponent, handleOpenEditor, actualConfig } = useEditorProvider()
  const { handleDeleteComponent } = useDragAndDropProvider()
  useEffect(() => {
    const alterConf = { ...configComponent[actualConfig] }
    for (const iterator in alterConf) {
      alterConf[iterator] = alterConf[iterator]?.replaceAll("px", "").split(" ")
    }
    setConfigTemplate(alterConf)
  }, [configComponent])


  const handleChange = (e) => {
    const { target } = e
    if (target.name == "padding") {
      const padding = [...configTemplate.padding]
      target.dataset.block ? padding[0] = target.value : padding[1] = target.value
      setConfigTemplate({ ...configTemplate, padding })
      handleEditComponent({ ...configTemplate, padding: `${padding[0]}px ${padding[1]}px` })
    }
  }

  const handleDelete = () => {
    handleDeleteComponent(actualConfig)
    handleOpenEditor({ open: false })
  }


  return (
    <div className='px-2'>
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

      <div>
        <span>Padding</span>
        <div className='grid grid-cols-2 gap-4 *:outline-none *:p-1'>
          <div className='w-full flex items-center gap-2'>
            <label htmlFor="block">Y</label>
            <input className='w-full' type="number" name="padding" data-block="true" id='block' min={0} onChange={handleChange} value={configTemplate?.padding[0]} />
          </div>
          <div className='w-full flex items-center gap-2'>
            <label htmlFor="inline">X</label>
            <input className='w-full' type="number" name="padding" data-inline="true" min={0} id='inline' onChange={handleChange} value={configTemplate?.padding[1]} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorTools