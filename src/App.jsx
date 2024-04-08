import { Suspense, lazy } from "react"
import { BuilderArea } from "./components/builderarea/BuilderArea"
import { Loader } from "./components/Loader/Loader"
import AddComponent from "./components/addcomponents/AddComponent"
import ComponentsTree from "./components/componentstree/ComponentsTree"
const EditorTools = lazy(() => import("./tools/EditorTools"))
const DialogExport = lazy(() => import("./components/dialogExport/DialogExport"))

function App() {
  return (
    <div className='builder__area'>
      <aside className='builder__aside builder__aside--left'>
        <Suspense fallback={<Loader size={"md"} />}>
          <DialogExport />
        </Suspense>
        <AddComponent />
        <ComponentsTree />
      </aside>
      <BuilderArea />
      <aside className='builder__aside builder__aside--right'>
        <Suspense fallback={<Loader />}>
          <EditorTools />
        </Suspense>
      </aside>
    </div>
  )
}

export default App
