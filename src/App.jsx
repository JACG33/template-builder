import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { BuilderArea } from "./components/builderarea/BuilderArea"
import SideBarLeftItems from "./components/sidebarleftitems/SideBarLeftItems"
import TopAreaBuilder from "./components/topareabuilder/TopAreaBuilder"
import SideBarRigthtItems from "./components/sidebarrigthtitems/SideBarLeftItems"

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
      <div className='w-full h-screen builder__area bg-gray-900'>
        <TopAreaBuilder />
        <DndContext sensors={sensors}>
          <SideBarLeftItems />
          <BuilderArea />
        </DndContext>
        <SideBarRigthtItems/>
      </div>
    </>
  )
}

export default App
