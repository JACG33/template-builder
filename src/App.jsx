import { Suspense, lazy } from "react"
import { BuilderArea } from "./components/BuilderArea"
const EditorTools = lazy(() => import("./tools/EditorTools"))
import { useEditorProvider } from "./hoks/useEditorProvider"
import { Loader } from "./components/Loader/Loader"
import AddComponent from "./components/addcomponents/AddComponent"
import ComponentsTree from "./components/componentstree/ComponentsTree"
const DialogExport = lazy(() => import("./components/dialogExport/DialogExport"))

function App() {
  const { openEditor } = useEditorProvider()
  return (
    <div className='grid grid-cols-[50px_1fr_270px]'>
      <aside className='bg-slate-600 w-[50px] h-screen flex flex-col items-center justify-start gap-2 py-2'>
        <DialogExport />
        <AddComponent />
        <ComponentsTree />
      </aside>
      <main className="h-screen overflow-auto">
        <BuilderArea />
      </main>
      <aside className='bg-slate-600 w-[270px] h-screen overflow-x-auto flex flex-col items-center justify-start gap-2 py-2'>
        <Suspense fallback={<Loader />}>
          {openEditor && <EditorTools />}
        </Suspense>
      </aside>
    </div>
  )
}

export default App
