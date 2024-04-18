import { useDragAndDropProvider } from '../../hoks/useDragAndDropProvider'
import { useEditorProvider } from '../../hoks/useEditorProvider'

const SideBarElementsRendered = () => {
  const { itemsToTemplate, subItemsToTemplate, handleDeleteComponent } = useDragAndDropProvider()
  const { handleOpenEditor, getConfigComponent } = useEditorProvider()

  const handleDelete = (configNmae = "") => {
    handleDeleteComponent(configNmae)
    handleOpenEditor({ open: false })
  }

  const handleSetOpenEditor = (id) => {
    const conf = getConfigComponent(id)
    handleOpenEditor({ conf, cssClass: id, open: true })
  }

  return (
    <>
      <span className='text-center'>Rendered Components</span>
      <div className='my-2 grid gap-2'>
        {itemsToTemplate?.length > 0 && itemsToTemplate.map(ele => {
          return (
            <div key={ele.id} className='tree__element'>
              <button type='button' onClick={e => handleSetOpenEditor(`${ele.type}${ele.id}`)}>{`<${ele.type}>`}</button>
              <ButtonDelete handleDelete={handleDelete} type={ele.type} id={ele.id} />
            </div>
          )
        }
        )}

        {subItemsToTemplate?.length > 0 && subItemsToTemplate.map(ele => {
          return (
            <div key={ele.id} className='tree__element'>
              <button type='button' onClick={e => handleSetOpenEditor(`${ele.type}${ele.id}`)} key={ele.id}>{`<${ele.type}>`}</button>
              <ButtonDelete handleDelete={handleDelete} type={ele.type} id={ele.id} />
            </div>
          )
        }
        )}
      </div>
    </>
  )
}

const ButtonDelete = ({ handleDelete, type, id }) => {
  return (
    <button type='button' className=' py-1 px-2 border border-red-600 rounded-lg hover:text-white hover:bg-red-600'
      onClick={e => handleDelete(`${type}${id}`)}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
    </button>
  )
}

export default SideBarElementsRendered