import { createContext, useContext, useState, useRef } from "react";
import { useEditorProvider } from "./EditorProvider";

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
  handleSortComponents: () => { },
})

export function DragAndDropProvider({ children }) {
  const [dragginElement, setDragginElement] = useState("")
  const [idDragginElement, setIdDragginElement] = useState(null)
  const [itemsToTemplate, setitemsToTemplate] = useState([])
  const [subItemsToTemplate, setSubItemsToTemplate] = useState([])
  const [dragEnter, setdragEnter] = useState("")
  const [counterComponents, setCounterComponents] = useState(0)
  const { deleteConfigStyle } = useEditorProvider()
  const draggedComponent = useRef()
  const draggedOverComponent = useRef()

  const handleDragginElement = (e, id, index) => {
    if (index != undefined) draggedComponent.current = index

    setDragginElement(e.target)

    if (id) setIdDragginElement(id)
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
      const idParent = Number(e.target.dataset.idcomponent);
      const findComponents = itemsToTemplate.map(ele => ele).filter((ele) => ele.id == idDragginElement);
      const findSubComponent = subItemsToTemplate.map(ele => ele).filter((ele) => ele.id == idDragginElement);
      const filteredComponents = itemsToTemplate.map(ele => ele).filter((ele) => ele.id !== idDragginElement);

      findComponents.forEach(ele => {
        if (ele.id == idDragginElement) ele.parentId = idParent
      })

      findSubComponent.forEach(ele => {
        if (ele.id == idDragginElement && ele.parentId != idParent) {
          ele.parentId = idParent;
        }
      })

      setSubItemsToTemplate([...subItemsToTemplate, ...findComponents]);
      setitemsToTemplate(filteredComponents);
      setIdDragginElement(null)
    }
  }

  const handleOver = (e, id = null) => {
    e.preventDefault()
    e.stopPropagation()
    if (id)
      draggedOverComponent.current = id
    setdragEnter("bg-white/10")
  }

  const handleLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setdragEnter("")
  }

  const handleSortComponents = (e, index) => {
    e.preventDefault()
    e.stopPropagation()

    if (draggedComponent.current != undefined) {
      const cloneComponents = Object.assign([], itemsToTemplate)
      const temp = cloneComponents[draggedComponent.current]

      cloneComponents[draggedComponent.current] = cloneComponents[draggedOverComponent.current]
      cloneComponents[draggedOverComponent.current] = temp

      setitemsToTemplate(cloneComponents)
    }
  }

  const handleDeleteComponent = (id) => {
    const filteredComponents = itemsToTemplate.filter((ele) => ele.id !== id);
    const filteredSubComponents = subItemsToTemplate.filter((ele) => ele.id !== id && ele.parentId !== id);
    setitemsToTemplate(filteredComponents);
    setSubItemsToTemplate(filteredSubComponents);
    deleteConfigStyle(id)
  }

  return (
    <DragAndDropContext.Provider
      value={{
        dragEnter, itemsToTemplate, subItemsToTemplate, handleDragEnter, handleDrop, handleLeave, handleOver, handleDeleteComponent, handleDragginElement, dragginElement, handleSubDrop, handleSortComponents
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  )
}


export const useDragAndDropProvider = () => useContext(DragAndDropContext)