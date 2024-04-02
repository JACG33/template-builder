import { createContext, useState, useRef } from "react";

export const EditorContext = createContext({
  configComponent: false,
  setConfigComponent: () => { },
  handleEditComponent: () => { },
  openEditor: false,
  setOpenEditor: () => { },
  handleOpenEditor: ({ conf, name, open, cssClass }) => { },
  actualConfig: false,
  setActualConfig: () => { },
  handleActualConfig: () => { },
  deleteConfigStyle: () => { },
  getConfigComponent: () => { },
})

export function EditorProvider({ children }) {

  const [configComponent, setConfigComponent] = useState()
  const [actualConfig, setActualConfig] = useState()
  const [openEditor, setOpenEditor] = useState(false)
  const cssStylesRef = useRef()

  const handleEditComponent = (conf) => {
    setConfigComponent({ ...configComponent, [actualConfig]: conf })
    cssStylesRef.current = { ...configComponent, [actualConfig]: conf }
    setHeadStyles()
  }

  const handleActualConfig = (nameConfig) => setActualConfig(nameConfig)

  /**
   * Funcion para tranformar texto de camelCase a lowercase y separar con guion medio (-).
   * @param {String} text Texto a transformar.
   * @example borderRadius => border-radius.
   * @returns Texto transformado
   */
  const joinAndLower = (text) => text.replace(/([a-z])([A-Z])/g, '$1 $2').split(" ").join("-").toLocaleLowerCase();

  /**
   * Funcion para generar reglas css.
   * @param {Object} opc Objecto de opciones.
   * @param {Array} opc.toIterate Array a iterar.
   * @returns Regala css
   */
  const makeCssRule = ({ toIterate = [] }) => {
    let rule = ``
    for (const iterator in toIterate) toIterate[iterator] != "" ? rule += `  ${joinAndLower(iterator)}: ${toIterate[iterator]};\n` : ""
    return rule
  }

  const setHeadStyles = (data = null) => {

    let cssStyles = ``;

    if (!document.querySelector("style[data-develope]")) {
      const style = document.createElement("style")
      style.dataset.develope = true

      cssStyles = `.${data[0]} {\n`
      cssStyles += makeCssRule({ toIterate: data[1] })
      cssStyles += `}\n`

      style.innerHTML = cssStyles
      document.querySelector("head").appendChild(style)
    } else {

      if (configComponent) {
        let classes = Object.keys(cssStylesRef.current)

        classes?.forEach(classStyle => {
          cssStyles += `.${classStyle} {\n`
          cssStyles += makeCssRule({ toIterate: cssStylesRef.current[classStyle] })
          cssStyles += `}\n`
        });

        document.querySelector("style[data-develope]").innerHTML = cssStyles
      }
    }
  }

  /**
   * Funcion para abrir el editor de estilos del Elemento/Componente elegido.
   * @param {Object} opciones Json de opiones.
   * @param {Object} opcoines.conf Json de la configuracion del Elemento/Componente elegido.
   * @param {String|Number} opciones.name Nombre/Identidicador de la configuracion del Elemento/Componente elegido.
   * @param {Boolean} opciones.open Boolean que identifica si esta o no abierto el editor de estilos del Elemento/Componente elegido.
   */
  const handleOpenEditor = ({ conf, name, open, cssClass }) => {
    if (open == true) {
      setOpenEditor(true)
      setConfigComponent({ ...configComponent, [cssClass]: conf })
      handleActualConfig(cssClass)
      cssStylesRef.current = { ...configComponent, [cssClass]: conf }
      setHeadStyles([cssClass, conf])
    } else {
      setActualConfig(null)
      setOpenEditor(!openEditor)
    }
  }

  const deleteConfigStyle = (id) => {
    const alter = Object.assign({}, configComponent)
    delete alter[id]
    setConfigComponent(alter)
  }

  /**
   * Funcion para obtener la configuracion de los estilos del Elemento/Componente elegido.
   * @param {String|Number} id Nombre/Identidicador de la configuracion del Elemento/Componente elegido.
   * @returns Json de la configuracion del Elemento/Componente elegido.
   */
  const getConfigComponent = (id) => configComponent?.[id] ? configComponent[id] : {}

  return (
    <EditorContext.Provider
      value={{
        configComponent, setConfigComponent, handleEditComponent, openEditor, handleOpenEditor, actualConfig, handleActualConfig, deleteConfigStyle, getConfigComponent
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}


