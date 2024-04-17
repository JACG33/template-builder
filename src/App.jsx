import { Suspense, lazy } from "react"
import { Loader } from "./components/Loader/Loader"
import { BuilderArea } from "./components/builderarea/BuilderArea"
import SideBarLeftItems from "./components/sidebarleftitems/SideBarLeftItems"
const EditorTools = lazy(() => import("./tools/EditorTools"))
const DialogExport = lazy(() => import("./components/dialogExport/DialogExport"))

function App() {
  return (
    <div className='builder__area'>
      <aside className='builder__aside builder__aside--left'>
        <Suspense fallback={<Loader size={"md"} />}>
          <DialogExport />
        </Suspense>
        <SideBarLeftItems />
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
