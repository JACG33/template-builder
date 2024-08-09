import { createContext, useState } from "react";
import { useEditorProvider } from "../hoks/useEditorProvider";
import { ramdomid } from "../helpers/randomid";

export const DragAndDropContext = createContext({
  parentElements: [],
  subElements: [],
  handleDeleteComponent: (id) => {},
  handleDragginElement: () => {},
  handleDragEnd: (e) => {},
  setNewCssSelector: ({ id, isSubComponent, newCssSelector }) => {},
  deleteCssSelector: ({ id, isSubComponent, cssSelector }) => {},

  changeTextOfComponent :({ isSubComponent, text, id })=>{}
});

export function DragAndDropProvider({ children }) {
  const [parentElements, setParentElements] = useState([]);
  const [subElements, setSubElements] = useState([]);
  const { deleteConfigStyle, setUiStyles, setComponentCssSelectors } =
    useEditorProvider();

  /**
   * Funcion que importa dinamicamente un componente y lo renderiza.
   * @param {Object} opc Objeto de opciones.
   * @param {Function} opc.fnState Funcion para actualizar un estado.
   * @param {Array} opc.arrayState Array del estado a ser actualizado.
   * @param {String} opc.typeElement Tipo de elemento en formato de texto.
   * @param {Number|String} opc.parentId Identificador de un componente padre en caso el componente se encuentre dentro de otro.
   * @param {Object} opc.other Objecto de parametros adicionales.
   */
  const impAndSetComponent = ({
    fnState,
    arrayState,
    typeElement,
    parentId = undefined,
    other,
  }) => {
    let Com = other.component;
    let typehtml = other.typehtml || typeElement;
    let idComponent = Number(ramdomid());
    let replaceDataId = ramdomid();
    let otherCssClases = [
      `${typehtml}${idComponent}`,
      Object.keys(
        JSON.parse(
          JSON?.stringify(other?.stylesModifiers)?.replaceAll(
            "dataId",
            replaceDataId
          )
        )
      ),
    ].flat();

    /**
     * Funcion recursiva que modifica el tmpSubComponents.
     * @param {Object} opc Objecto de opciones.
     * @param {Response} opc.res Responce del import de componentes.
     * @param {Array} opc.tmpSubComponents Array de subComponents para modifica el state.
     * @param {Array} opc.subs Array de subComponents.
     * @param {Number} opc.id Identificador del parentElement.
     * @param {Object} opc.uiStyles Objeto de estilos.
     * @param {Object} opc.uiStylesMediaquerys Objeto de estilos mediaquiery.
     */
    const importSub = ({
      res,
      tmpSubComponents,
      subs,
      id,
      uiStyles,
      uiStylesMediaquerys,
    }) => {
      subs.forEach((subCom) => {
        const subId = Number(ramdomid());
        tmpSubComponents.push({
          id: subId,
          component: res[subCom.name],
          styles: subCom.styles,
          otherCssClases:
            subCom.stylesModifiers != undefined
              ? [
                  `${subCom.type}${subId}`,
                  Object.keys(
                    JSON.parse(
                      JSON?.stringify(subCom.stylesModifiers)?.replaceAll(
                        "dataId",
                        replaceDataId
                      )
                    )
                  ),
                ].flat()
              : [`${subCom.type}${subId}`],
          type: subCom.type,
          moreParams: subCom?.moreParams
            ? JSON.parse(
                JSON?.stringify(subCom?.moreParams)?.replaceAll(
                  "dataId",
                  replaceDataId
                )
              )
            : {},
          parentId: id,
          innerText: other?.textToComponent,
        });
        // Estilos
        if (subCom.styles != undefined) {
          uiStyles[`${subCom.type}${subId}`] = subCom.styles;
        }

        // Estilos Modificadores
        if (subCom.stylesModifiers != undefined) {
          uiStyles[`${subCom.type}${subId}`] = subCom.styles;
          let keys = Object.keys(subCom.stylesModifiers);
          keys.forEach((key) => {
            uiStyles[`${subCom.type}${subId}${key}`] =
              subCom.stylesModifiers[key];
          });
        }

        // MediaQuerys
        if (subCom.mediaQuerys != undefined) {
          let keys = Object.keys(subCom.mediaQuerys);
          keys.forEach((key) => {
            uiStylesMediaquerys[key] = {
              ...uiStylesMediaquerys[key],
              [`${subCom.type}${subId}`]: subCom.mediaQuerys[key],
            };
          });
        }

        // SubComponentes
        if (subCom?.subs?.length > 0)
          importSub({
            res,
            tmpSubComponents,
            subs: subCom.subs,
            id: subId,
            uiStyles,
            uiStylesMediaquerys,
          });
      });
    };

    if (other?.componentUi == true) {
      import("../components/templatesui/").then((res) => {
        let uiStyles = {};
        let uiStylesMediaquerys = {};
        let scripts = {};
        let tmpSubComponents = [];
        let parentElement = [];

        // Si no existe un parentId es un componente ParentElement, de lo contrario es un SubComponent
        if (parentId == undefined)
          fnState([
            ...arrayState,
            {
              id: idComponent,
              component: res[Com],
              type: typehtml,
              parentId,
              otherCssClases,
              styles: other.styles,
            },
          ]);
        else
          parentElement = [
            {
              id: idComponent,
              component: res[Com],
              type: typehtml,
              parentId,
              otherCssClases,
              styles: other.styles,
            },
          ];

        uiStyles[`${typehtml}${idComponent}`] = other.styles;
        scripts[`${typehtml}${idComponent}`] = JSON.parse(
          JSON?.stringify(other.scripts)?.replaceAll("dataId", replaceDataId)
        );

        other.subElements.forEach((subCom) => {
          const subId = Number(ramdomid());
          tmpSubComponents.push({
            id: subId,
            component: res[subCom.name],
            styles: subCom.styles,
            otherCssClases:
              subCom.stylesModifiers != undefined
                ? [
                    `${subCom.type}${subId}`,
                    Object.keys(
                      JSON.parse(
                        JSON?.stringify(subCom.stylesModifiers)?.replaceAll(
                          "dataId",
                          replaceDataId
                        )
                      )
                    ),
                  ].flat()
                : [`${subCom.type}${subId}`],
            type: subCom.type,
            moreParams: subCom?.moreParams
              ? JSON.parse(
                  JSON?.stringify(subCom?.moreParams)?.replaceAll(
                    "dataId",
                    replaceDataId
                  )
                )
              : {},
            parentId: idComponent,
          });
          // Estilos
          if (subCom.styles != undefined) {
            uiStyles[`${subCom.type}${subId}`] = subCom.styles;
          }

          // Estilos Modificadores
          if (subCom.stylesModifiers != undefined) {
            uiStyles[`${subCom.type}${subId}`] = subCom.styles;
            let keys = Object.keys(subCom.stylesModifiers);
            keys.forEach((key) => {
              uiStyles[`${key.replaceAll("dataId", replaceDataId)}`] =
                subCom.stylesModifiers[key];
            });
          }

          // MediaQuerys
          if (subCom.mediaQuerys != undefined) {
            let keys = Object.keys(subCom.mediaQuerys);
            keys.forEach((key) => {
              uiStylesMediaquerys[key] = {
                ...uiStylesMediaquerys[key],
                [`${subCom.type}${subId}`]: subCom.mediaQuerys[key],
              };
            });
          }

          // SubComponentes
          if (subCom?.subs?.length > 0)
            importSub({
              res,
              tmpSubComponents,
              subs: subCom.subs,
              id: subId,
              uiStyles,
              uiStylesMediaquerys,
            });
        });
        // console.log(uiStylesMediaquerys);
        setUiStyles({
          uiStyles: { ...uiStyles, ...other?.stylesModifiers },
          uiStylesMediaquerys,
          scripts,
        });
        setSubElements([...subElements, ...parentElement, ...tmpSubComponents]);
      });
    } else
      import("../components/templatesui/").then((res) =>
        fnState([
          ...arrayState,
          {
            id: idComponent,
            component: res[Com],
            type: typehtml,
            parentId,
            innerText: other?.textToComponent,
          },
        ])
      );
  };

  /**
   * Funcion que elimina ParentElement/SubComponent
   * @param {String|Number} id Identificador
   */
  const handleDeleteComponent = (id) => {
    let comId = Number(id.replace(/[a-zA-Z]+/, "").replace(".", ""));
    const filteredComponents = parentElements.filter((ele) => ele.id !== comId);
    const filteredSubComponents = subElements.filter(
      (ele) => ele.id !== comId && ele.parentId !== comId
    );

    let ids = [];
    subElements.map((ele) => {
      if (ele.parentId == comId) {
        ids.push(`${ele.type}${ele.id}`);
        subElements.map((ele2) => {
          if (ele2.parentId == ele.id) ids.push(`${ele2.type}${ele2.id}`);
        });
      }
    });

    deleteConfigStyle([id, ...ids]);
    setParentElements(filteredComponents);
    setSubElements(filteredSubComponents);
  };

  /**
   * Funcion que modifica el texto de un componente
   * @param {Object} opc Objeto de parametros. 
   * @param {Boolean} opc.isSubComponent Boolean. 
   * @param {String} opc.text Nuevo texto. 
   * @param {Number|String} opc.id Identificador del componente. 
   */
  const changeTextOfComponent = ({ isSubComponent, text, id }) => {
    if (isSubComponent) {
      let clone = Object.assign([],subElements);
      clone = clone.map((ele) => {
        if (ele.id == id) {
          return {
            ...ele,
            innerText: text,
          };
        } else {
          return ele;
        }
      });

      setSubElements(clone);
    } else {
      let clone = Object.assign([],parentElements);
      clone = clone.map((ele) => {
        if (ele.id == id) {
          return {
            ...ele,
            innerText: text,
          };
        } else {
          return ele;
        }
      });

      setParentElements(clone);
    }
  };

  /**
   * Funcion que asigna nuevos selectores si no existe en el array de selectores.
   * @param {Object} opc Objeto de parametros.
   * @param {Number|String} opc.id Identificador del ParentElement/SubElement.
   * @param {Boolean} opc.isSubComponent Booleano que determina si es un SubElement.
   * @param {String} opc.newCssSelector Nuevo selector css.
   */
  const setNewCssSelector = ({ id, isSubComponent, newCssSelector }) => {
    let component = {};

    if (isSubComponent) {
      component = subElements.filter((ele) => ele.id == id)[0];
      let find = component.otherCssClases.find((ele) => ele == newCssSelector);
      if (!find) component.otherCssClases.push(newCssSelector);
    } else {
      component = parentElements.filter((ele) => ele.id == id)[0];
      let find = component.otherCssClases.find((ele) => ele == newCssSelector);
      if (!find) component.otherCssClases.push(newCssSelector);
    }
  };

  /**
   * Funcion que elimina selectores css del array de selectores.
   * @param {Object} opc Objeto de parametros.
   * @param {Number|String} opc.id Identificador del ParentElement/SubElement.
   * @param {Boolean} opc.isSubComponent Booleano que determina si es un SubElement.
   * @param {String} opc.cssSelector Selector css a eliminar.
   */
  const deleteCssSelector = ({ id, isSubComponent, cssSelector }) => {
    let component = {};
    let selectors = [];

    if (isSubComponent) {
      component = subElements.filter((ele) => ele.id == id)[0];
      selectors = component.otherCssClases.filter((ele) => ele !== cssSelector);
      setSubElements(
        subElements.map((subElement) => {
          if (subElement.id == id) {
            subElement.otherCssClases = selectors;
            return subElement;
          } else {
            return subElement;
          }
        })
      );
    } else {
      component = parentElements.filter((ele) => ele.id == id)[0];
      selectors = component.otherCssClases.filter((ele) => ele !== cssSelector);
      setParentElements(
        parentElements.map((parentElement) => {
          if (parentElement.id == id) {
            parentElement.otherCssClases = selectors;
            return parentElement;
          } else {
            return parentElement;
          }
        })
      );
    }
    setComponentCssSelectors(selectors);
  };

  /**
   * Funcion que busca index en un array.
   * @param {String|Number} id Id del elemnto.
   * @param {Array} arrayData Array de los elemntos.
   * @returns Index del elemento encontrado.
   */
  const getIndex = (id, arrayData) =>
    arrayData.findIndex((task) => task.id === id);

  /**
   * Funcion que ordena los ParentComponents y SubComponents
   * @param {Object} opc Objetos de parametros.
   * @param {Function} opc.fntState Funcion modificadora del State.
   * @param {Number} opc.overIndex Indice del array del Over Element.
   * @param {Object} opc.componentToSet Objecto del componente a ser agregado.
   * @param {Number} opc.idActive Id del elemento que se esta moviendo.
   */
  const changePositionOfComponents = ({
    fnState,
    overIndex,
    componentToSet,
    idActive,
  }) => {
    fnState((prev) => {
      const newEle = [...prev.filter((ele) => ele.id != idActive)];
      newEle.splice(overIndex, 0, ...componentToSet);
      return newEle;
    });
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;

    // Drop en el BuilderArea
    if (over.data.current.typeElement == "builderArea") {
      // Si el Componente/Elemento viene del SidaBar
      if (active.data.current?.sideBar) {
        impAndSetComponent({
          fnState: setParentElements,
          arrayState: parentElements,
          other: {
            component: active.data.current?.component,
            typehtml: active.data.current?.typehtml,
            componentUi: active.data.current?.componentUi,
            subElements: active.data.current?.subElements,
            styles: active.data.current?.styles,
            stylesModifiers: active.data.current?.stylesModifiers,
            scripts: active.data.current?.scripts,
            textToComponent: active.data.current?.textToComponent,
          },
        });
      } else {
        // Si es un SubComponente/SubElemento
        if (active.data.current?.parent) {
          const idActive = active.data.current.idIndex;
          const findComponents = [...subElements].filter(
            (ele) => ele?.id == idActive
          );
          const filteredComponents = [...subElements].filter(
            (ele) => ele?.id !== idActive
          );

          findComponents.forEach((ele) =>
            ele?.id == idActive ? delete ele.parentId : ""
          );
          setParentElements([...parentElements, ...findComponents]);
          setSubElements(filteredComponents);
        } else {
          const idActive = active.data.current.idIndex;

          const filteredComponent = parentElements.filter(
            (ele) => ele.id !== idActive
          );
          const findComponent = parentElements.filter(
            (ele) => ele.id == idActive
          );

          setParentElements([...filteredComponent, ...findComponent]);
        }
      }
    }

    // Drop en el Centro de un Componente/Elemento
    if (over.data.current.typeElement == "centerdroppable") {
      // Si el Drop ocurre sobre si mismo no hacer nada
      if (active.data.current.idIndex == over.data.current.idIndex) return;

      // Si el Componente/Elemento viene del SidaBar
      if (active.data.current?.sideBar) {
        impAndSetComponent({
          fnState: setSubElements,
          arrayState: subElements,
          parentId: over.data.current.idIndex,
          other: {
            component: active.data.current?.component,
            typehtml: active.data.current?.typehtml,
            componentUi: active.data.current?.componentUi,
            subElements: active.data.current?.subElements,
            styles: active.data.current?.styles,
            stylesModifiers: active.data.current?.stylesModifiers,
            scripts: active.data.current?.scripts,
            textToComponent: active.data.current?.textToComponent,
          },
        });
      } else {
        const idParent = Number(over.data.current.idIndex);
        const idActive = active.data.current.idIndex;
        const findComponents = Object.assign([], parentElements)
          .map((ele) => ele)
          .filter((ele) => Number(ele.id) == Number(idActive));
        const findSubComponent = Object.assign([], subElements)
          .map((ele) => ele)
          .filter((ele) => Number(ele?.id) == Number(idActive));
        const filteredComponents = Object.assign([], parentElements)
          .map((ele) => ele)
          .filter((ele) => Number(ele?.id) !== Number(idActive));

        findComponents.forEach((ele) => {
          if (ele?.id == idActive) ele.parentId = idParent;
        });

        findSubComponent.forEach((ele) => {
          if (ele?.id == idActive && ele.parentId != idParent) {
            ele.parentId = idParent;
          }
        });

        setSubElements([...subElements, ...findComponents]);
        setParentElements(filteredComponents);
      }
    }

    // Drop en el Top/Bottom de un Componente/Elemento
    if (
      over.data.current.typeElement == "topdroppable" ||
      over.data.current.typeElement == "bottomdroppable"
    ) {
      // Si el Drop ocurre sobre si mismo no hacer nada
      if (active.data.current.idIndex == over.data.current.idIndex) return;

      // Si el Componente/Elemento viene del SideBar
      if (active.data.current?.sideBar) {
        impAndSetComponent({
          fnState: setParentElements,
          arrayState: parentElements,
          other: {
            component: active.data.current?.component,
            typehtml: active.data.current?.typehtml,
            componentUi: active.data.current?.componentUi,
            subElements: active.data.current?.subElements,
            styles: active.data.current?.styles,
            stylesModifiers: active.data.current?.stylesModifiers,
            scripts: active.data.current?.scripts,
            textToComponent: active.data.current?.textToComponent,
          },
        });
      } else {
        // Si es un SubComponent
        if (active.data.current?.parent) {
          // Si el SubComponent se quiere extraer de un componente y colocarlo en el top/bottom de un ParentElement
          if (!over.data.current?.parent) {
            const activeIndex = getIndex(
              over.data.current.idIndex,
              parentElements
            );
            const overIndex = getIndex(
              over.data.current.idIndex,
              parentElements
            );

            const idActive = active.data.current.idIndex;
            const findComponent = Object.assign([], subElements)
              .map((ele) => ele)
              .filter((ele) => Number(ele.id) == Number(idActive));

            // Drop en el Top
            if (over.data.current.typeElement == "topdroppable") {
              // Si el activeIndex es menor al overIndex colocar el nuevo elemento antes del overElement, de lo contrario colocarlo en la posicion del overElement
              if (activeIndex < overIndex)
                changePositionOfComponents({
                  fnState: setParentElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex: overIndex - 1,
                });
              else
                changePositionOfComponents({
                  fnState: setParentElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex,
                });
            }

            // Drop en el Top
            if (over.data.current.typeElement == "topdroppable") {
              // Si el activeIndex es menor al overIndex colocar el nuevo elemento antes del overElement, de lo contrario colocarlo en la posicion del overElement
              if (activeIndex < overIndex)
                changePositionOfComponents({
                  fnState: setParentElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex: overIndex - 1,
                });
              else
                changePositionOfComponents({
                  fnState: setParentElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex,
                });
            }

            // Eliminar SubComponent
            const filteredSubComponents = subElements.filter(
              (ele) => ele.id !== idActive && ele.parentId !== idActive
            );
            setSubElements(filteredSubComponents);
          } else {
            const activeIndex = getIndex(
              active.data.current.idIndex,
              subElements
            );
            const overIndex = getIndex(over.data.current.idIndex, subElements);

            const idActive = active.data.current.idIndex;
            const findComponent = Object.assign([], subElements)
              .map((ele) => ele)
              .filter((ele) => Number(ele.id) == Number(idActive));

            // Drop en el Top
            if (over.data.current.typeElement == "topdroppable") {
              // Si el activeIndex es menor al overIndex colocar el nuevo elemento antes del overElement, de lo contrario colocarlo en la posicion del overElement
              if (activeIndex < overIndex)
                changePositionOfComponents({
                  fnState: setSubElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex: overIndex - 1,
                });
              else
                changePositionOfComponents({
                  fnState: setSubElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex,
                });
            }

            // Drop en el Bottom
            if (over.data.current.typeElement == "bottomdroppable") {
              // Si el activeIndex es menor al overIndex colocar el nuevo elemento en la posicion del overElement, de lo contrario colocarlo despues de la posicion del overElement
              if (activeIndex < overIndex)
                changePositionOfComponents({
                  fnState: setSubElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex,
                });
              else
                changePositionOfComponents({
                  fnState: setSubElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex: overIndex + 1,
                });
            }
          }
        } else {
          // Si el ParentElement se quiere incluir dentro de un componente y colocarlo en el top/bottom de un SubComponent
          if (over.data.current?.parent) {
            const activeIndex = getIndex(
              active.data.current.idIndex,
              parentElements
            );
            const overIndex = getIndex(over.data.current.idIndex, subElements);

            const idActive = active.data.current.idIndex;
            const findComponent = Object.assign([], parentElements)
              .map((ele) => ele)
              .filter((ele) => Number(ele.id) == Number(idActive));
            findComponent[0].parentId = over.data.current.parent;

            // Drop en el Top
            if (over.data.current.typeElement == "topdroppable") {
              changePositionOfComponents({
                fnState: setSubElements,
                idActive,
                componentToSet: findComponent,
                overIndex,
              });
            }

            // Drop en el Bottom
            if (over.data.current.typeElement == "bottomdroppable") {
              // Si el activeIndex es menor al overIndex colocar el nuevo elemento en la posicion del overElement, de lo contrario colocarlo despues de la posicion del overElement
              if (activeIndex < overIndex)
                changePositionOfComponents({
                  fnState: setSubElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex,
                });
              else
                changePositionOfComponents({
                  fnState: setSubElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex: overIndex + 1,
                });
            }

            // Eliminar ParentElement
            const filteredComponents = parentElements.filter(
              (ele) => ele.id !== idActive
            );
            setParentElements(filteredComponents);
          } else {
            const activeIndex = getIndex(
              active.data.current.idIndex,
              parentElements
            );
            const overIndex = getIndex(
              over.data.current.idIndex,
              parentElements
            );

            const idActive = active.data.current.idIndex;
            const findComponent = Object.assign([], parentElements)
              .map((ele) => ele)
              .filter((ele) => Number(ele.id) == Number(idActive));

            // Drop en el Top
            if (over.data.current.typeElement == "topdroppable") {
              // Si el activeIndex es menor al overIndex colocar el nuevo elemento antes del overElement, de lo contrario colocarlo en la posicion del overElement
              if (activeIndex < overIndex)
                changePositionOfComponents({
                  fnState: setParentElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex: overIndex - 1,
                });
              else
                changePositionOfComponents({
                  fnState: setParentElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex,
                });
            }

            // Drop en el Bottom
            if (over.data.current.typeElement == "bottomdroppable") {
              // Si el activeIndex es menor al overIndex colocar el nuevo elemento en la posicion del overElement, de lo contrario colocarlo despues de la posicion del overElement
              if (activeIndex < overIndex)
                changePositionOfComponents({
                  fnState: setParentElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex,
                });
              else
                changePositionOfComponents({
                  fnState: setParentElements,
                  idActive,
                  componentToSet: findComponent,
                  overIndex: overIndex + 1,
                });
            }
          }
        }
      }
    }
  };

  return (
    <DragAndDropContext.Provider
      value={{
        parentElements,
        subElements,
        handleDeleteComponent,
        handleDragEnd,
        setNewCssSelector,
        deleteCssSelector,
        changeTextOfComponent,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
}
