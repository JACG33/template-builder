import { useDragAndDropProvider } from '../hoks/useDragAndDropProvider'
import { useEditorProvider } from '../hoks/useEditorProvider'

const SideBarElementsRendered = () => {
  const { itemsToTemplate, subItemsToTemplate } = useDragAndDropProvider()
  const { handleOpenEditor, getConfigComponent } = useEditorProvider()

  const handleSetOpenEditor = (id) => {
    const conf = getConfigComponent(id)
    handleOpenEditor({ conf, name: id, open: true })
  }

  return (
    <aside className='bg-slate-600 w-full flex flex-col h-screen overflow-x-auto'>
      <span className='text-center'>Rendered Components</span>
      <div className='my-2 grid gap-2'>
        {itemsToTemplate?.length > 0 && itemsToTemplate.map(ele =>
          <button type='button' onClick={e => handleSetOpenEditor(`${ele.type}${ele.id}`)} key={ele.id}>{`<${ele.type}>`}</button>)}
        {subItemsToTemplate?.length > 0 && subItemsToTemplate.map(ele =>
          <button type='button' onClick={e => handleSetOpenEditor(`${ele.type}${ele.id}`)} key={ele.id}>{`<${ele.type}>`}</button>)}
      </div>
    </aside>
  )
}

export default SideBarElementsRendered