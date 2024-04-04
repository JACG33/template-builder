import { Suspense, lazy } from "react"
import { BuilderArea } from "./components/BuilderArea"
const EditorTools = lazy(() => import("./tools/EditorTools"))
import { useEditorProvider } from "./hoks/useEditorProvider"
const SideBarElementsItems = lazy(() => import("./components/SideBarElementsItems"))
const SideBarElementsRendered = lazy(() => import("./components/SideBarElementsRendered"))
import { useExportImportProvider } from "./hoks/useExportImportProvider"
import { Loader } from "./components/Loader/Loader"
const DialogExport = lazy(() => import("./components/dialogExport/DialogExport"))

function App() {
  const { openEditor } = useEditorProvider()
  const { handleExport } = useExportImportProvider()
  return (
    <div className='grid grid-cols-[270px_1fr_150px]'>
      <aside className='bg-slate-600 w-[270px] h-screen overflow-x-auto'>
        <div>
          <Suspense fallback={""}>
            <DialogExport />
          </Suspense>
          <button type="button" className="m-auto p-2 bg-indigo-600 text-white rounded-lg" onClick={handleExport}>Export</button>
        </div>
        <div>
          <div>
            <Suspense fallback={<Loader/>}>
              {!openEditor && <SideBarElementsItems />}
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<Loader/>}>
          {openEditor && <EditorTools />}
        </Suspense>
      </aside>
      <main className="h-screen overflow-auto">
        <BuilderArea />
      </main>
      <Suspense fallback={<Loader/>}>
        <SideBarElementsRendered />
      </Suspense>
    </div>
  )
}

export default App
