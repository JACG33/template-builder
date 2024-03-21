import { createContext, useState, useRef, useEffect } from "react";
import { useEditorProvider } from "../hoks/useEditorProvider";
import { SUB_COMPONENTS } from "../constants/subComponents";

export const DragAndDropContext = createContext({
  dragginElement: "",
  setDragginElement: () => { },
  itemsToTemplate: [],
  subItemsToTemplate: [],
  handleDragEnter: () => { },
  handleDrop: () => { },
  handleSubDrop: () => { },
  handleOver: () => { },
  handleLeave: () => { },
  handleDropEnd: () => { },
  handleDeleteComponent: () => { },
  handleDragginElement: () => { },
  handleSortComponents: () => { },
})

export function DragAndDropProvider({ children }) {
  const [dragginElement, setDragginElement] = useState("")
  const [idDragginElement, setIdDragginElement] = useState(null)
  const [itemsToTemplate, setitemsToTemplate] = useState([])
  const [subItemsToTemplate, setSubItemsToTemplate] = useState([])
  const { deleteConfigStyle } = useEditorProvider()
  const draggedComponent = useRef()
  const draggedOverComponent = useRef()
  const counterComponents = useRef(0)
  const ctrlKeyPress = useRef(null)

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.key == "Control") ctrlKeyPress.current = "control"
    })
    document.addEventListener("keyup", e => {
      if (e.key == "Control") ctrlKeyPress.current = null
    })

    return () => {

      document.removeEventListener("keydown", e => { })
      document.removeEventListener("keyup", e => { })
    }
  }, [])

  const handleDragginElement = (e, id, index) => {
    if (index != undefined) draggedComponent.current = index

    setDragginElement(e.target)

    if (id) setIdDragginElement(id)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  /**
   * Funcion para importar y setea un componente.
   * @param {Object} opc Objeto de opciones.
   * @param {Function} opc.fnState Funcion para actualizar un estado.
   * @param {Array} opc.arrayState Array del estado a ser actualizado.
   * @param {String} opc.typeElement Tipo de elemento en formato de texto.
   * @param {Number|String} opc.parentId Identificador de un componente padre en caso el componente se encuentre dentro de otro. 
   */
  const impAndSetComponent = ({ fnState, arrayState, typeElement, parentId }) => {
    let Com = dragginElement?.dataset?.component
    let typehtml = dragginElement?.dataset?.typehtml || typeElement
    let count = counterComponents.current++
    import("../components/templatesui/").then(res => fnState([...arrayState, { id: count, component: res[Com], type: typehtml, parentId }]))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (ctrlKeyPress.current == "control") return
    // console.log(idDragginElement);
    if (idDragginElement == null) {
      impAndSetComponent({ fnState: setitemsToTemplate, arrayState: itemsToTemplate })
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
    // removeStylesOverElement(e)
  }

  const handleSubDrop = (e, parentId, typeElement) => {
    e.preventDefault()
    e.stopPropagation()
    if (ctrlKeyPress.current == "control") return
    // console.log(typeElement);
    // if (SUB_COMPONENTS[typehtml]==true) return
    if (idDragginElement == null) {
      impAndSetComponent({ fnState: setSubItemsToTemplate, arrayState: subItemsToTemplate, typeElement, parentId })
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

  const handleOver = (e, id = null, isParentComponent) => {
    e.preventDefault()
    e.stopPropagation()
    if (id && ctrlKeyPress.current == "control") {
      draggedOverComponent.current = id
      stylesOverElement(e)
    }
  }

  const handleLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDropEnd = (e, isParentComponent) => {
    e.preventDefault()
    e.stopPropagation()
    if (ctrlKeyPress.current == "control") {
      removeStylesOverElement(e)
      hndSortComponents(isParentComponent)
      ctrlKeyPress.current = null
    }
  }

  const handleSortComponents = (e, isParentComponent) => {
    e.preventDefault()
    e.stopPropagation()
    hndSortComponents(isParentComponent)
  }

  const hndSortComponents = (isParentComponent) => {

    if (draggedComponent.current != undefined && draggedOverComponent.current != undefined) {
      if (isParentComponent == true) {
        const sortedComponents = sortComponents({ originalComponents: itemsToTemplate, currentDragging: draggedComponent.current, currentOverDragging: draggedOverComponent.current })
        
        setitemsToTemplate(sortedComponents)
      } else {
        const sortedComponents = sortComponents({ originalComponents: subItemsToTemplate, currentDragging: draggedComponent.current, currentOverDragging: draggedOverComponent.current })

        setSubItemsToTemplate(sortedComponents)
      }
    }
    draggedComponent.current = undefined
    draggedOverComponent.current = undefined
  }

  /**
   * Funcion que ordena un array de componentes.
   * @param {Object} opc Objeto de opcoines.
   * @param {Array} opc.originaComponets Array con las informacion de todos los components.
   * @param {Strin|Number} opc.currentDragging Identificador del componente que se esta arrastrando. 
   * @param {Strin|Number} opc.currentOverDragging Identificador del componente por el cual esta pasando/flotando el componente que se esta arrastrando. 
   * @returns Array de componentes ordenados.
   */
  const sortComponents = ({ originalComponents, currentDragging, currentOverDragging }) => {
    const cloneComponents = Object.assign([], originalComponents)
    const temp = cloneComponents[currentDragging]

    cloneComponents[currentDragging] = cloneComponents[currentOverDragging]
    cloneComponents[currentOverDragging] = temp

    return cloneComponents
  }

  const handleDeleteComponent = (id) => {
    const filteredComponents = itemsToTemplate.filter((ele) => ele.id !== id);
    const filteredSubComponents = subItemsToTemplate.filter((ele) => ele.id !== id && ele.parentId !== id);
    setitemsToTemplate(filteredComponents);
    setSubItemsToTemplate(filteredSubComponents);
    deleteConfigStyle(id)
  }


  const stylesOverElement = (e) => {
    let rect = e.target.getBoundingClientRect();
    let width = rect.width / 2
    let x = e.clientX - rect.left; //x position within the element.
    let y = e.clientY - rect.top;  //y position within the element.
    removeStylesOverElement(e)
    e.target.classList.add("element__drag__over")
    if (x > width) {
      e.target.classList.add("element__drag__over--right")
      e.target.style.marginRight = "20px"
    }
    if (x < width) {
      e.target.classList.add("element__drag__over--left")
      e.target.style.marginLeft = "20px"
    }
  }

  const removeStylesOverElement = (e=null) => {
    document.querySelectorAll(".element__drag__over")?.forEach(ele => {
      ele.style.marginRight = null
      ele.style.marginLeft = null
      ele.classList.remove("element__drag__over")
      ele.classList.remove("element__drag__over--right")
      ele.classList.remove("element__drag__over--left")
    })
  }



  return (
    <DragAndDropContext.Provider
      value={{
        itemsToTemplate, subItemsToTemplate, handleDragEnter, handleDrop, handleLeave, handleDropEnd, handleOver, handleDeleteComponent, handleDragginElement, dragginElement, handleSubDrop, handleSortComponents
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  )
}