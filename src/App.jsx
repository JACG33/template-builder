import { BuilderArea } from "./components/BuilderArea"
import NavBars from "./components/NavBars"
import EditorTools from "./tools/EditorTools"
import { useEditorProvider } from "./context/EditorProvider"
import { useDragAndDropProvider } from "./context/DragDropProvider"
import DivElement from "./components/DivElement"
import ButtonElement from "./components/ButtonElement"

function App() {
  const { openEditor } = useEditorProvider()
  const { itemsToTemplate, subItemsToTemplate } = useDragAndDropProvider()
  return (
    <div className='grid grid-cols-[250px_1fr_150px]'>
      <aside className='bg-slate-600 w-[250px] h-screen overflow-x-auto'>
        <div>
          <div className='p-4 flex items-center'>
            <input type="search" className='w-full h-full p-2 rounded-tl-lg rounded-bl-lg outline-none' />
            <button type="button" className='p-2 rounded-tr-lg rounded-br-lg bg-slate-500'>search</button>
          </div>
          <div>
            <NavBars />
            <DivElement />
            <ButtonElement />
          </div>
        </div>
        {openEditor && <EditorTools />}
      </aside>
      <main className="h-screen overflow-auto">
        <BuilderArea />
      </main>
      <aside className='bg-slate-600 w-full flex flex-col h-screen overflow-x-auto'>
        {itemsToTemplate.length > 0 && itemsToTemplate.map(ele => <span key={ele.id}>{`<${ele.type}>`}</span>)}
        {subItemsToTemplate.length > 0 && subItemsToTemplate.map(ele => <span key={ele.id}>{`<${ele.type}>`}</span>)}
      </aside>
    </div>
  )
}

export default App
