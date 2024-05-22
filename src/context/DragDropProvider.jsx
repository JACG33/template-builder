import { createContext, useState } from "react";
import { useEditorProvider } from "../hoks/useEditorProvider";
import { ramdomid } from "../helpers/randomid";

export const DragAndDropContext = createContext({
  parentElements: [],
  subElements: [],
  handleDeleteComponent: () => { },
  handleDragginElement: () => { },
  handleDragEnd: () => { },
})

export function DragAndDropProvider({ children }) {
  const [parentElements, setParentElements] = useState([])
  const [subElements, setSubElements] = useState([])
  const { deleteConfigStyle } = useEditorProvider()

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
    let idComponent = Number(ramdomid())

    const importSub = ({ res, tmpSubComponents, subs, id }) => {
      subs.forEach(subCom => {
        const subId = Number(ramdomid())
        tmpSubComponents.push({ id: subId, component: res[subCom.name], styles: subCom.styles, type: subCom.type, parentId: id })
        if (subCom?.subs?.length > 0)
          importSub({ res, tmpSubComponents, subs: subCom.subs, id: subId })
      })
    }



    if (other?.componentUi == true) {
      import("../components/templatesui/").then(res => {
        fnState([...arrayState, { id: idComponent, component: res[Com], type: typehtml, parentId, styles: other.styles }])

        let tmpSubComponents = []

        other.subElements.forEach(subCom => {
          const subId = Number(ramdomid())
          tmpSubComponents.push({ id: subId, component: res[subCom.name], styles: subCom.styles, type: subCom.type, parentId: idComponent })
          if (subCom?.subs?.length > 0)
            importSub({ res, tmpSubComponents, subs: subCom.subs, id: subId })
        })


        // importSub(res, tmpSubComponents)
        setSubElements([...subElements, ...tmpSubComponents])

      })

      console.log(other.subElements);

    }
    else
      import("../components/templatesui/").then(res => fnState([...arrayState, { id: idComponent, component: res[Com], type: typehtml, parentId }]))
  }

  const handleDeleteComponent = (id) => {
    let comId = Number(id.replace(/[a-zA-Z]+/, "").replace(".", ""))
    const filteredComponents = parentElements.filter((ele) => ele.id !== comId);
    const filteredSubComponents = subElements.filter((ele) => ele.id !== comId && ele.parentId !== comId);
    deleteConfigStyle(id)
    setParentElements(filteredComponents);
    setSubElements(filteredSubComponents);
  }

  /**
   * Funcion que busca index en un array.
   * @param {String|Number} id Id del elemnto. 
   * @param {Array} arrayData Array de los elemntos.
   * @returns Index del elemento encontrado.
   */
  const getIndex = (id, arrayData) => arrayData.findIndex(task => task.id === id)

  /**
   * Funcion que ordena los ParentComponents y SubComponents
   * @param {Object} opc Objetos de parametros. 
   * @param {Function} opc.fntState Funcion modificadora del State. 
   * @param {Number} opc.overIndex Indice del array del Over Element. 
   * @param {Object} opc.componentToSet Objecto del componente a ser agregado. 
   * @param {Number} opc.idActive Id del elemento que se esta moviendo. 
   */
  const changePositionOfComponents = ({ fnState, overIndex, componentToSet, idActive }) => {
    fnState(prev => {
      const newEle = [...prev.filter(ele => ele.id != idActive)];
      newEle.splice(overIndex, 0, ...componentToSet)
      return newEle
    })
  }

  const handleDragEnd = (e) => {
    const { active, over } = e

    // Drop en el BuilderArea
    if (over.data.current.typeElement == "builderArea") {

      // Si el Componente/Elemento viene del SidaBar
      if (active.data.current?.sideBar) {
        impAndSetComponent({
          fnState: setParentElements, arrayState: parentElements, other: {
            component: active.data.current?.component,
            typehtml: active.data.current?.typehtml,
            componentUi: active.data.current?.componentUi,
            subElements: active.data.current?.subElements,
            styles: active.data.current?.styles
          }
        })
      } else {

        // Si es un SubComponente/SubElemento
        if (active.data.current?.parent) {
          const idActive = active.data.current.idIndex
          const findComponents = [...subElements].filter((ele) => ele?.id == idActive);
          const filteredComponents = [...subElements].filter((ele) => ele?.id !== idActive);

          findComponents.forEach(ele => ele?.id == idActive ? delete ele.parentId : "")
          setParentElements([...parentElements, ...findComponents]);
          setSubElements(filteredComponents);
        } else {
          const idActive = active.data.current.idIndex

          const filteredComponent = parentElements.filter((ele) => ele.id !== idActive);
          const findComponent = parentElements.filter((ele) => ele.id == idActive);

          setParentElements([...filteredComponent, ...findComponent]);
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
          fnState: setSubElements, arrayState: subElements, parentId: over.data.current.idIndex, other: {
            component: active.data.current?.component,
            typehtml: active.data.current?.typehtml
          }
        })
      } else {
        const idParent = Number(over.data.current.idIndex);
        const idActive = active.data.current.idIndex
        const findComponents = Object.assign([], parentElements).map(ele => ele).filter((ele) => Number(ele.id) == Number(idActive));
        const findSubComponent = Object.assign([], subElements).map(ele => ele).filter((ele) => Number(ele?.id) == Number(idActive));
        const filteredComponents = Object.assign([], parentElements).map(ele => ele).filter((ele) => Number(ele?.id) !== Number(idActive));

        findComponents.forEach(ele => {
          if (ele?.id == idActive) ele.parentId = idParent
        })

        findSubComponent.forEach(ele => {
          if (ele?.id == idActive && ele.parentId != idParent) {
            ele.parentId = idParent;
          }
        })

        setSubElements([...subElements, ...findComponents]);
        setParentElements(filteredComponents);
      }

    }

    // Drop en el Top/Bottom de un Componente/Elemento
    if (over.data.current.typeElement == "topdroppable" || over.data.current.typeElement == "bottomdroppable") {

      // Si el Drop ocurre sobre si mismo no hacer nada
      if (active.data.current.idIndex == over.data.current.idIndex) return

      // Si el Componente/Elemento viene del SideBar
      if (active.data.current?.sideBar) {
        impAndSetComponent({
          fnState: setParentElements, arrayState: parentElements, other: {
            component: active.data.current?.component,
            typehtml: active.data.current?.typehtml
          }
        })
      } else {
        // Si es un SubComponent
        if (active.data.current?.parent) {

          // Si el SubComponent se quiere extraer de un componente y colocarlo en el top/bottom de un ParentElement
          if (!over.data.current?.parent) {
            const overIndex = getIndex(over.data.current.idIndex, parentElements)

            const idActive = active.data.current.idIndex
            const findComponent = Object.assign([], subElements).map(ele => ele).filter((ele) => Number(ele.id) == Number(idActive));

            // Drop en el Top
            if (over.data.current.typeElement == "topdroppable") {
              changePositionOfComponents({ fnState: setParentElements, idActive, componentToSet: findComponent, overIndex })
            }

            // Drop en el Bottom
            if (over.data.current.typeElement == "bottomdroppable") {
              changePositionOfComponents({ fnState: setParentElements, idActive, componentToSet: findComponent, overIndex: overIndex + 1 })
            }

            // Eliminar SubComponent
            const filteredSubComponents = subElements.filter((ele) => ele.id !== idActive && ele.parentId !== idActive);
            setSubElements(filteredSubComponents)
          } else {

            const activeIndex = getIndex(active.data.current.idIndex, subElements)
            const overIndex = getIndex(over.data.current.idIndex, subElements)

            const idActive = active.data.current.idIndex
            const findComponent = Object.assign([], subElements).map(ele => ele).filter((ele) => Number(ele.id) == Number(idActive));

            // Drop en el Top
            if (over.data.current.typeElement == "topdroppable") {
              // Si el activeIndex es menor al overIndex colocar el nuevo elemento antes del overElement, de lo contrario colocarlo en la posicion del overElement
              if (activeIndex < overIndex)
                changePositionOfComponents({ fnState: setSubElements, idActive, componentToSet: findComponent, overIndex: overIndex - 1 })
              else
                changePositionOfComponents({ fnState: setSubElements, idActive, componentToSet: findComponent, overIndex })
            }

            // Drop en el Bottom
            if (over.data.current.typeElement == "bottomdroppable") {
              changePositionOfComponents({ fnState: setSubElements, idActive, componentToSet: findComponent, overIndex: overIndex + 1 })
            }
          }
        } else {

          // Si el ParentElement se quiere incluir dentro de un componente y colocarlo en el top/bottom de un SubComponent
          if (over.data.current?.parent) {
            const overIndex = getIndex(over.data.current.idIndex, subElements)

            const idActive = active.data.current.idIndex
            const findComponent = Object.assign([], parentElements).map(ele => ele).filter((ele) => Number(ele.id) == Number(idActive));
            findComponent[0].parentId = over.data.current.parent

            // Drop en el Top
            if (over.data.current.typeElement == "topdroppable") {
              changePositionOfComponents({ fnState: setSubElements, idActive, componentToSet: findComponent, overIndex })
            }

            // Drop en el Bottom
            if (over.data.current.typeElement == "bottomdroppable") {
              changePositionOfComponents({ fnState: setSubElements, idActive, componentToSet: findComponent, overIndex: overIndex + 1 })
            }

            // Eliminar ParentElement
            const filteredComponents = parentElements.filter((ele) => ele.id !== idActive);
            setParentElements(filteredComponents)
          } else {
            const activeIndex = getIndex(active.data.current.idIndex, parentElements)
            const overIndex = getIndex(over.data.current.idIndex, parentElements)

            const idActive = active.data.current.idIndex
            const findComponent = Object.assign([], parentElements).map(ele => ele).filter((ele) => Number(ele.id) == Number(idActive));

            // Drop en el Top
            if (over.data.current.typeElement == "topdroppable") {
              // Si el activeIndex es menor al overIndex colocar el nuevo elemento antes del overElement, de lo contrario colocarlo en la posicion del overElement
              if (activeIndex < overIndex)
                changePositionOfComponents({ fnState: setParentElements, idActive, componentToSet: findComponent, overIndex: overIndex - 1 })
              else
                changePositionOfComponents({ fnState: setParentElements, idActive, componentToSet: findComponent, overIndex })
            }

            // Drop en el Bottom
            if (over.data.current.typeElement == "bottomdroppable") {
              changePositionOfComponents({ fnState: setParentElements, idActive, componentToSet: findComponent, overIndex: overIndex + 1 })
            }
          }
        }
      }
    }
  }

  return (
    <DragAndDropContext.Provider
      value={{ parentElements, subElements, handleDeleteComponent, handleDragEnd }}
    >
      {children}
    </DragAndDropContext.Provider>
  )
}