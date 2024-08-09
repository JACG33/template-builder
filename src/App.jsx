import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { Suspense, lazy } from "react"
import { Loader } from "./components/Loader/Loader"
import { BuilderArea } from "./components/builderarea/BuilderArea"
import SideBarLeftItems from "./components/sidebarleftitems/SideBarLeftItems"
import TopAreaBuilder from "./components/topareabuilder/TopAreaBuilder"
import EditorTools from "./components/editor-css/EditorTools"
const DialogExport = lazy(() => import("./components/dialogExport/DialogExport"))

function App() {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <>
      <div className='builder__area'>
        <TopAreaBuilder />
        <DndContext sensors={sensors}>
          <aside className='builder__aside builder__aside--left'>
            <Suspense fallback={<Loader size={"md"} />}>
              <DialogExport />
            </Suspense>
            <SideBarLeftItems />
          </aside>
          <BuilderArea />
        </DndContext>
        <aside className='builder__aside builder__aside--right'>
          <Suspense fallback={<Loader />}>
            <EditorTools />
          </Suspense>
        </aside>
      </div>
    </>
  )
}

export default App
