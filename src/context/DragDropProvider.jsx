import { createContext, useContext, useState } from "react";

const DragAndDropContext = createContext({
  dragginElement: "",
  setDragginElement: () => { },
  dragEnter: "",
  itemsToTemplate: [],
  handleDragEnter: () => { },
  handleDrop: () => { },
  handleOver: () => { },
  handleLeave: () => { },
  handleDeleteComponent: () => { },
  handleDragginElement: () => { },
})

export function DragAndDropProvider({ children }) {
  const [dragginElement, setDragginElement] = useState("")
  const [itemsToTemplate, setitemsToTemplate] = useState([])
  const [dragEnter, setdragEnter] = useState("")
  const [counterComponents, setCounterComponents] = useState(0)

  const handleDragginElement = (e) => {
    setDragginElement(e.target)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setdragEnter("bg-white/10")
  }
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let Com = dragginElement?.dataset?.component
    let count = counterComponents
    count++
    import("../components/templatesui/").then(res => setitemsToTemplate([...itemsToTemplate, { id: count, component: res[Com] }]))
    setCounterComponents(count)
    setdragEnter("")
  }

  const handleOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setdragEnter("")
  }

  const handleDeleteComponent = (id) => {
    const filteredComponents = itemsToTemplate.filter((ele) => ele.id !== id);
    setitemsToTemplate(filteredComponents);
  }

  return (
    <DragAndDropContext.Provider
      value={{
        dragEnter, itemsToTemplate, handleDragEnter, handleDrop, handleLeave, handleOver, handleDeleteComponent, handleDragginElement, dragginElement
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  )
}


export const useDragAndDropProvider = () => useContext(DragAndDropContext)