import { createContext, useRef, useState } from "react";
import { useEditorProvider } from "../hoks/useEditorProvider";

export const DragAndDropContext = createContext({
  itemsToTemplate: [],
  subItemsToTemplate: [],
  handleDeleteComponent: () => { },
  handleDragginElement: () => { },
  handleDragEnd: () => { },
})

export function DragAndDropProvider({ children }) {
  const [itemsToTemplate, setitemsToTemplate] = useState([])
  const [subItemsToTemplate, setSubItemsToTemplate] = useState([])
  const { deleteConfigStyle } = useEditorProvider()
  const counterComponents = useRef(1)

  /**
   * Funcion que importa dinamicamente un componente y lo renderiza.
   * @param {Object} opc Objeto de opciones.
   * @param {Function} opc.fnState Funcion para actualizar un estado.
   * @param {Array} opc.arrayState Array del estado a ser actualizado.
   * @param {String} opc.typeElement Tipo de elemento en formato de texto.
   * @param {Number|String} opc.parentId Identificador de un componente padre en caso el componente se encuentre dentro de otro. 
   * @param {Object} opc.other Objecto de parametros adicionales. 
   */
  const impAndSetComponent = ({ fnState, arrayState, typeElement, parentId, other }) => {
    let Com = other.component
    let typehtml = other.typehtml || typeElement
    let count = counterComponents.current++
    import("../components/templatesui/").then(res => fnState([...arrayState, { id: count, component: res[Com], type: typehtml, parentId }]))
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

  /**
   * Funcion que busca index en un array.
   * @param {String|Number} id Id del elemnto. 
   * @param {Array} arrayData Array de los elemntos.
   * @returns Index del elemento encontrado.
   */
  const getIndex = (id, arrayData) => arrayData.findIndex(task => task.id === id)

  const handleDragEnd = (e) => {
    const { active, over } = e

    // Drop en el BuilderArea
    if (over.data.current.typeElement == "builderArea") {

      // Si el Componente/Elemento viene del SidaBar
      if (active.data.current?.sideBar) {
        impAndSetComponent({
          fnState: setitemsToTemplate, arrayState: itemsToTemplate, other: {
            component: active.data.current?.component,
            typehtml: active.data.current?.typehtml
          }
        })
      } else {

        // Si es un SubComponente/SubElemento
        if (active.data.current?.parent) {
          console.log("Extract");
          const idActive = active.data.current.idIndex
          const findComponents = [...subItemsToTemplate].filter((ele) => ele?.id == idActive);
          const filteredComponents = [...subItemsToTemplate].filter((ele) => ele?.id !== idActive);

          findComponents.forEach(ele => ele?.id == idActive ? delete ele.parentId : "")
          setitemsToTemplate([...itemsToTemplate, ...findComponents]);
          setSubItemsToTemplate(filteredComponents);
        } else {
          console.log("Order to Last");
          const idActive = active.data.current.idIndex

          const filteredComponent = itemsToTemplate.filter((ele) => ele.id !== idActive);
          const findComponent = itemsToTemplate.filter((ele) => ele.id == idActive);

          setitemsToTemplate([...filteredComponent, ...findComponent]);
        }

      }

    }

    // Drop en el Centro de un Componente/Elemento
    if (over.data.current.typeElement == "centerdroppable") {

      // Si el Drop ocurre sobre si mismo no hacer nada
      if (active.data.current.idIndex == over.data.current.idIndex) return

      // Si el Componente/Elemento viene del SidaBar
      if (active.data.current?.sideBar) {
        impAndSetComponent({
          fnState: setSubItemsToTemplate, arrayState: subItemsToTemplate, parentId: over.data.current.idIndex, other: {
            component: active.data.current?.component,
            typehtml: active.data.current?.typehtml
          }
        })
      } else {
        const idParent = Number(over.data.current.idIndex);
        const idActive = active.data.current.idIndex
        const findComponents = Object.assign([], itemsToTemplate).map(ele => ele).filter((ele) => Number(ele.id) == Number(idActive));
        const findSubComponent = Object.assign([], subItemsToTemplate).map(ele => ele).filter((ele) => Number(ele?.id) == Number(idActive));
        const filteredComponents = Object.assign([], itemsToTemplate).map(ele => ele).filter((ele) => Number(ele?.id) !== Number(idActive));

        findComponents.forEach(ele => {
          if (ele?.id == idActive) ele.parentId = idParent
        })

        findSubComponent.forEach(ele => {
          if (ele?.id == idActive && ele.parentId != idParent) {
            ele.parentId = idParent;
          }
        })

        setSubItemsToTemplate([...subItemsToTemplate, ...findComponents]);
        setitemsToTemplate(filteredComponents);
      }

    }

    // Drop en el Top/Bottom de un Componente/Elemento
    if (over.data.current.typeElement == "topdroppable" || over.data.current.typeElement == "bottomdroppable") {

      // Si el Drop ocurre sobre si mismo no hacer nada
      if (active.data.current.idIndex == over.data.current.idIndex) return

      // Si el Componente/Elemento viene del SidaBar
      if (active.data.current?.sideBar) {
        impAndSetComponent({
          fnState: setitemsToTemplate, arrayState: itemsToTemplate, other: {
            component: active.data.current?.component,
            typehtml: active.data.current?.typehtml
          }
        })
      } else {
        if (active.data.current?.parent) {
          const original = getIndex(active.data.current.idIndex, subItemsToTemplate)
          const newp = getIndex(over.data.current.idIndex, subItemsToTemplate)

          const sortedComponents = sortComponents({ originalComponents: subItemsToTemplate, currentDragging: original, currentOverDragging: newp })

          setSubItemsToTemplate(sortedComponents)
        } else {
          const original = getIndex(active.data.current.idIndex, itemsToTemplate)
          const newp = getIndex(over.data.current.idIndex, itemsToTemplate)

          const sortedComponents = sortComponents({ originalComponents: itemsToTemplate, currentDragging: original, currentOverDragging: newp })
          setitemsToTemplate(sortedComponents)
        }
      }

    }

  }

  return (
    <DragAndDropContext.Provider
      value={{ itemsToTemplate, subItemsToTemplate, handleDeleteComponent, handleDragEnd }}
    >
      {children}
    </DragAndDropContext.Provider>
  )
}