import { createContext, useState, useRef } from "react";
import { useBraeackPointProvider } from "../hoks/useBreackPointProvider";

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
  setAditionalStyles: () => { },
})

export function EditorProvider({ children }) {

  const [configComponent, setConfigComponent] = useState()
  const [actualConfig, setActualConfig] = useState()
  const [openEditor, setOpenEditor] = useState(false)
  const cssStylesRef = useRef()
  const { breackPoint } = useBraeackPointProvider()

  const handleEditComponent = (conf) => {
    if (openEditor == true) {
      if (breackPoint == "mobilex2" || breackPoint == "tablet" || breackPoint == "desktop" || breackPoint == "desktopx2" || breackPoint == "desktopx3") {
        setConfigComponent({ ...configComponent, [breackPoint]: { [actualConfig]: conf } })
        cssStylesRef.current = { ...configComponent, [breackPoint]: { [actualConfig]: conf } }
        setHeadStyles()
      } else {
        setConfigComponent({ ...configComponent, [actualConfig]: conf })
        cssStylesRef.current = { ...configComponent, [actualConfig]: conf }
        setHeadStyles()
      }
    }
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
   * Funcion para asignar media querys
   * @returns String con la media query
   */
  const setMediaQuerys = () => {
    let mediaQuery = "";
    if (breackPoint == "mobilex2") {
      mediaQuery = "@media screen and (width>480px){";
    }
    if (breackPoint == "tablet") {
      mediaQuery = "@media screen and (width>768px){";

    }
    if (breackPoint == "desktop") {
      mediaQuery = "@media screen and (width>1024px){";

    }
    if (breackPoint == "desktopx2") {
      mediaQuery = "@media screen and (width>1280px){";

    }
    if (breackPoint == "desktopx3") {
      mediaQuery = "@media screen and (width>1440px){";

    }
    return mediaQuery

  }

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
    let cssStyles = `* {\n  padding: 0px;\n  margin: 0px;\n  box-sizing: border-box;\n}\n`;

    // Setear una etiqueta <style> en el head en el caso de no existir.
    if (!document.querySelector("style[data-develope]")) {
      const style = document.createElement("style")
      style.dataset.develope = true

      let mediaquery = setMediaQuerys();

      cssStyles = mediaquery;
      cssStyles += `.${data[0]} {\n`
      cssStyles += makeCssRule({ toIterate: data[1] })
      cssStyles += `}\n`
      if (mediaquery != "")
        cssStyles += `}\n`


      style.innerHTML = cssStyles
      document.querySelector("head").appendChild(style)
    } else {

      if (configComponent) {
        let classes = Object.keys(cssStylesRef.current)

        classes?.forEach(classStyle => {
          let mediaquery = setMediaQuerys();

          cssStyles += `.${classStyle} {\n`
          cssStyles += makeCssRule({ toIterate: cssStylesRef.current[classStyle] })
          cssStyles += `}\n`

          if (classStyle == "mobilex2" || classStyle == "tablet" || classStyle == "desktop" || classStyle == "desktopx2" || classStyle == "desktopx3") {

            let classMedia = Object.keys(cssStylesRef.current[classStyle])

            classMedia?.forEach(classMQ => {
              cssStyles += mediaquery;
              cssStyles += `.${classMQ} {\n`
              cssStyles += makeCssRule({ toIterate: cssStylesRef.current[classStyle][classMQ] })
              cssStyles += `}\n`
              if (mediaquery != "")
                cssStyles += `}\n`
            })

          }

        });

        document.querySelector("style[data-develope]").innerHTML = cssStyles
      }
    }

    // let ifr= iframeTmp.current.contentWindow || iframeTmp.current.contentDocument.document || iframeTmp.current.contentDocument;
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
      setOpenEditor(false)
    }
  }

  const deleteConfigStyle = (id) => {
    const alter = Object.assign({}, configComponent)
    delete alter[id]
    setConfigComponent(alter)
  }

  const setAditionalStyles = (styles) => {
    setConfigComponent({ ...configComponent, styles })
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
        configComponent, setConfigComponent, handleEditComponent, openEditor, handleOpenEditor, actualConfig, handleActualConfig, deleteConfigStyle, getConfigComponent, setAditionalStyles
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}