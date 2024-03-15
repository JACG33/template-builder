import { BuilderArea } from "./components/BuilderArea"
import EditorTools from "./tools/EditorTools"
import { useEditorProvider } from "./context/EditorProvider"
import SideBarElementsItems from "./components/SideBarElementsItems"
import SideBarElementsRendered from "./components/SideBarElementsRendered"

function App() {
  const { openEditor } = useEditorProvider()
  return (
    <div className='grid grid-cols-[250px_1fr_150px]'>
      <aside className='bg-slate-600 w-[250px] h-screen overflow-x-auto'>
        <div>
          <div className='p-4 flex items-center'>
            <input type="search" className='w-full h-full p-2 rounded-tl-lg rounded-bl-lg outline-none' />
            <button type="button" className='p-2 rounded-tr-lg rounded-br-lg bg-slate-500'>search</button>
          </div>
          <div>
            {!openEditor && <SideBarElementsItems />}
          </div>
        </div>
        {openEditor && <EditorTools />}
      </aside>
      <main className="h-screen overflow-auto">
        <BuilderArea />
      </main>
      <SideBarElementsRendered />
    </div>
  )
}

export default App
