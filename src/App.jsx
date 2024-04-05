import { Suspense, lazy } from "react"
import { BuilderArea } from "./components/BuilderArea"
import { Loader } from "./components/Loader/Loader"
import AddComponent from "./components/addcomponents/AddComponent"
import ComponentsTree from "./components/componentstree/ComponentsTree"
import { useEditorProvider } from "./hoks/useEditorProvider"
const EditorTools = lazy(() => import("./tools/EditorTools"))
const DialogExport = lazy(() => import("./components/dialogExport/DialogExport"))

function App() {
  const { openEditor } = useEditorProvider()
  return (
    <div className='grid grid-cols-[50px_1fr_270px]'>
      <aside className='bg-slate-600 w-[50px] h-screen flex flex-col items-center justify-start gap-2 py-2'>
        <Suspense fallback={""}>
          <DialogExport />
        </Suspense>
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
