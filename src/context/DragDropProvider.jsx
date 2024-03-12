import { createContext, useContext, useState } from "react";

const DragAndDropContext = createContext({
  dragginElement: "",
  setDragginElement: () => { },
  dragEnter: "",
  itemsToTemplate: [],
  subItemsToTemplate: [],
  handleDragEnter: () => { },
  handleDrop: () => { },
  handleSubDrop: () => { },
  handleOver: () => { },
  handleLeave: () => { },
  handleDeleteComponent: () => { },
  handleDragginElement: () => { },
})

export function DragAndDropProvider({ children }) {
  const [dragginElement, setDragginElement] = useState("")
  const [idDragginElement, setIdDragginElement] = useState(null)
  const [itemsToTemplate, setitemsToTemplate] = useState([])
  const [subItemsToTemplate, setSubItemsToTemplate] = useState([])
  const [dragEnter, setdragEnter] = useState("")
  const [counterComponents, setCounterComponents] = useState(0)

  const handleDragginElement = (e, id) => {
    setDragginElement(e.target)
    if (id) {
      setIdDragginElement(id)
    }
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log(idDragginElement);
    if (!idDragginElement) {
      let Com = dragginElement?.dataset?.component
      let typehtml = dragginElement?.dataset?.typehtml
      let count = counterComponents
      count++
      import("../components/templatesui/").then(res => setitemsToTemplate([...itemsToTemplate, { id: count, component: res[Com], type: typehtml }]))
      setCounterComponents(count)
      setdragEnter("")
    } else {
      const findComponents = [...subItemsToTemplate].filter((ele) => ele.id == idDragginElement);
      const filteredComponents = [...subItemsToTemplate].filter((ele) => ele.id !== idDragginElement);

      findComponents.forEach(ele => {
        if (ele.id == idDragginElement) delete ele.parentId
      })
      // console.log(findComponents);
      setitemsToTemplate([...itemsToTemplate, ...findComponents]);
      setSubItemsToTemplate(filteredComponents);
      setIdDragginElement(null)
    }
  }

  const handleSubDrop = (e, parentId, typeElement) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log(idDragginElement);
    if (!idDragginElement) {
      let Com = dragginElement?.dataset?.component
      let typehtml = dragginElement?.dataset?.typehtml || typeElement
      let count = counterComponents
      count++
      import("../components/templatesui/").then(res => setSubItemsToTemplate([...subItemsToTemplate, { parentId, id: count, component: res[Com], type: typehtml }]))
      setCounterComponents(count)
    } else {
      const findComponents = [...itemsToTemplate].filter((ele) => ele.id == idDragginElement);
      const filteredComponents = itemsToTemplate.filter((ele) => ele.id !== idDragginElement);

      findComponents.forEach(ele => {
        if (ele.id == idDragginElement) ele.parentId = e.target.dataset.idcomponent
      })
      setitemsToTemplate(filteredComponents);
      setSubItemsToTemplate([...subItemsToTemplate, ...findComponents]);
      setIdDragginElement(null)
    }
  }

  const handleOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setdragEnter("bg-white/10")
  }

  const handleLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setdragEnter("")
  }

  const handleDeleteComponent = (id) => {
    const filteredComponents = itemsToTemplate.filter((ele) => ele.id !== id);
    const filteredSubComponents = subItemsToTemplate.filter((ele) => ele.id !== id && ele.parentId !== id);
    setitemsToTemplate(filteredComponents);
    setSubItemsToTemplate(filteredSubComponents);
  }

  return (
    <DragAndDropContext.Provider
      value={{
        dragEnter, itemsToTemplate, subItemsToTemplate, handleDragEnter, handleDrop, handleLeave, handleOver, handleDeleteComponent, handleDragginElement, dragginElement, handleSubDrop
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  )
}


export const useDragAndDropProvider = () => useContext(DragAndDropContext)