import { BuilderArea } from "./components/BuilderArea"
import EditorTools from "./tools/EditorTools"
import { useEditorProvider } from "./hoks/useEditorProvider"
import SideBarElementsItems from "./components/SideBarElementsItems"
import SideBarElementsRendered from "./components/SideBarElementsRendered"
import { useExportImportProvider } from "./hoks/useExportImportProvider"
import DialogExport from "./components/dialogExport/DialogExport"

function App() {
  const { openEditor } = useEditorProvider()
  const { handleExport } = useExportImportProvider()
  return (
    <div className='grid grid-cols-[270px_1fr_150px]'>
      <DialogExport/>
      <aside className='bg-slate-600 w-[270px] h-screen overflow-x-auto'>
        <div><button type="button" className="m-auto p-2 bg-indigo-600 text-white rounded-lg" onClick={handleExport}>Export</button></div>
        <div>
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
