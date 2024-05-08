import { createContext, useRef, useState } from "react";
import { useEditorProvider } from "../hoks/useEditorProvider";

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
  const [dragginElement, setDragginElement] = useState({ e: null, sideBar: false })
  const [idDragginElement, setIdDragginElement] = useState({ id: null, typeDraggin: "" })
  const [itemsToTemplate, setitemsToTemplate] = useState([])
  const [subItemsToTemplate, setSubItemsToTemplate] = useState([])
  const { deleteConfigStyle } = useEditorProvider()
  const draggedComponent = useRef()
  const draggedOverComponent = useRef()
  const counterComponents = useRef(0)

  const handleDragginElement = ({ e, sideBar }, id, index) => {
    if (index != undefined) draggedComponent.current = index

    setDragginElement({ e: e.target, sideBar })

    if (e.target.dataset.idcomponent) {
      setIdDragginElement({ id: Number(e.target.dataset.idcomponent), typeDraggin: e.target.dataset.parent })
    }
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
    let Com = dragginElement.e?.dataset?.component
    let typehtml = dragginElement.e?.dataset?.typehtml || typeElement
    let count = counterComponents.current++
    import("../components/templatesui/").then(res => fnState([...arrayState, { id: count, component: res[Com], type: typehtml, parentId }]))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (idDragginElement.id == null && dragginElement.sideBar) {
      impAndSetComponent({ fnState: setitemsToTemplate, arrayState: itemsToTemplate })
    } else {
      const findComponents = [...subItemsToTemplate].filter((ele) => ele?.id == idDragginElement.id);
      const filteredComponents = [...subItemsToTemplate].filter((ele) => ele?.id !== idDragginElement.id);

      findComponents.forEach(ele => {
        if (ele?.id == idDragginElement.id) delete ele.parentId
      })
      // console.log(findComponents);
      setitemsToTemplate([...itemsToTemplate, ...findComponents]);
      setSubItemsToTemplate(filteredComponents);
      if (!dragginElement.e.dataset.parent) hndSortComponents(true)
    }
    setIdDragginElement({ id: null, typeDraggin: "" })
  }

  const handleSubDrop = (e, parentId, typeElement) => {
    e.preventDefault()
    e.stopPropagation()

    if (idDragginElement.id == null) {
      impAndSetComponent({ fnState: setSubItemsToTemplate, arrayState: subItemsToTemplate, typeElement, parentId })
    } else {
      const idParent = Number(e.target.dataset.idcomponent);
      const findComponents = Object.assign([], itemsToTemplate).map(ele => ele).filter((ele) => Number(ele.id) == Number(idDragginElement.id));
      const findSubComponent = Object.assign([], subItemsToTemplate).map(ele => ele).filter((ele) => Number(ele?.id) == Number(idDragginElement.id));
      const filteredComponents = Object.assign([], itemsToTemplate).map(ele => ele).filter((ele) => Number(ele?.id) !== Number(idDragginElement.id));

      findComponents.forEach(ele => {
        if (ele?.id == idDragginElement.id) ele.parentId = idParent
      })

      findSubComponent.forEach(ele => {
        if (ele?.id == idDragginElement.id && ele.parentId != idParent) {
          ele.parentId = idParent;
        }
      })

      setSubItemsToTemplate([...subItemsToTemplate, ...findComponents]);
      setitemsToTemplate(filteredComponents);
      setIdDragginElement({ id: null, typeDraggin: "" })
      if (e.target.dataset.parent) hndSortComponents(false)
    }
  }

  const handleOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (idDragginElement.typeDraggin)
      if (e.target.dataset.parent && e.target.dataset.dragindex) {
        draggedOverComponent.current = Number(e.target.dataset.dragindex)
        stylesOverElement({ e: e })
        return
      }
    if (!idDragginElement.typeDraggin)
      if (!e.target.dataset.parent && e.target.dataset.dragindex && e.target.dataset.idcomponent) {
        draggedOverComponent.current = Number(e.target.dataset.dragindex)
        stylesOverElement({ e: e, inline: false })
        return
      }

    removeStylesOverElement(e)
  }
  const handleLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDropEnd = (e, isParentComponent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.target.dataset.parent) {
      removeStylesOverElement(e)
      hndSortComponents(isParentComponent)
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
    console.log(id);
    let comId = Number(id.replace(/[a-zA-Z]+/, "").replace(".", ""))
    const filteredComponents = itemsToTemplate.filter((ele) => ele.id !== comId);
    const filteredSubComponents = subItemsToTemplate.filter((ele) => ele.id !== comId && ele.parentId !== comId);
    deleteConfigStyle(id)
    setitemsToTemplate(filteredComponents);
    setSubItemsToTemplate(filteredSubComponents);
  }


  const stylesOverElement = ({ e, inline = true }) => {
    let rect = e.target.getBoundingClientRect();
    let width = rect.width / 2
    let height = rect.height / 2
    let x = e.clientX - rect.left; //x position within the element.
    let y = e.clientY - rect.top;  //y position within the element.

    e.target.classList.add("element__drag__over")

    if (inline) {
      if (x > width) e.target.style.marginRight = "20px"
      if (x < width) e.target.style.marginLeft = "20px"
    } else {
      if (y > height) e.target.style.marginBottom = "20px"
      if (y < height) e.target.style.marginTop = "20px"
    }
  }

  const removeStylesOverElement = (e = null) => {
    let ifr = document.querySelector(".builder__zone").contentWindow
    Array.from(ifr.document.querySelectorAll(".element__drag__over"))?.forEach(ele => {
      ele.style.marginRight = null
      ele.style.marginLeft = null
      ele.style.marginBottom = null
      ele.style.marginTop = null
      e.target.style.marginBottom = null
      e.target.style.marginTop = null
      ele.classList.remove("element__drag__over")
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