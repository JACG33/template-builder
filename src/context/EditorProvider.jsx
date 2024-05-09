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
  cssStylesSheetRef: null,
})

export function EditorProvider({ children }) {

  const [configComponent, setConfigComponent] = useState(
    {
      normalStyles: { body: {} },
      mediaQuerys: { body: {} }
    }
  )
  const [actualConfig, setActualConfig] = useState()
  const [openEditor, setOpenEditor] = useState(false)
  const cssStylesRef = useRef({
    normalStyles: { body: {} },
    mediaQuerys: { body: {} }
  })
  const cssStylesSheetRef = useRef()
  const { breackPoint } = useBraeackPointProvider()

  const handleEditComponent = (conf) => {
    if (openEditor == true) {
      if (breackPoint == "mobilex2" || breackPoint == "tablet" || breackPoint == "desktop" || breackPoint == "desktopx2" || breackPoint == "desktopx3") {
        setConfigComponent(
          {
            ...configComponent,
            mediaQuerys: {
              ...configComponent.mediaQuerys, [breackPoint]: { [actualConfig]: { ...configComponent.mediaQuerys[breackPoint]?.[actualConfig], ...conf } }
            }
          }
        )
        cssStylesRef.current = {
          ...cssStylesRef.current,
          mediaQuerys: {
            ...cssStylesRef.current.mediaQuerys, [breackPoint]: { [actualConfig]: { ...cssStylesRef.current.mediaQuerys[breackPoint]?.[actualConfig], ...conf } }
          }
        }
        setHeadStyles()
      } else {
        setConfigComponent(
          {
            ...configComponent,
            normalStyles: { ...configComponent.normalStyles, [actualConfig]: conf },
          }
        )
        cssStylesRef.current = {
          ...cssStylesRef.current,
          normalStyles: { ...cssStylesRef.current.normalStyles, [actualConfig]: conf },
        }
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
   * @param {String} mq Key de la media query 
   * @returns String con la media query
   */
  const setMediaQuerys = (mq) => {
    let mediaQuery = "";
    if (mq == "mobilex2") {
      mediaQuery = "@media screen and (width>=480px){";
    }
    if (mq == "tablet") {
      mediaQuery = "@media screen and (width>=768px){";

    }
    if (mq == "desktop") {
      mediaQuery = "@media screen and (width>=1024px){";

    }
    if (mq == "desktopx2") {
      mediaQuery = "@media screen and (width>=1280px){";

    }
    if (mq == "desktopx3") {
      mediaQuery = "@media screen and (width>=1440px){";

    }
    return mediaQuery

  }

  /**
   * Funcion que genera el cuerpo de las reglas css.
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
    if (Object.keys(configComponent.normalStyles).length == 0) {
      console.log(cssStylesRef.current);
      cssStyles += `.${data[0]} {\n`
      cssStyles += makeCssRule({ toIterate: data[1] })
      cssStyles += `}\n`

      cssStylesSheetRef.current = cssStyles

    } else {
      if (configComponent) {
        // Setear estilos que no van dentro de Media Querys
        let normalClasses = Object.keys(cssStylesRef.current.normalStyles)

        normalClasses?.forEach(classStyle => {
          cssStyles += `\n.${classStyle} {\n`
          cssStyles += makeCssRule({ toIterate: cssStylesRef.current.normalStyles[classStyle] })
          cssStyles += `}\n`
        });

        // Setear Media Querys
        let mediaQuerysClasses = Object.keys(cssStylesRef.current.mediaQuerys)

        mediaQuerysClasses?.forEach(classStyle => {
          let mq = setMediaQuerys(classStyle)
          let innerClasses = Object.keys(cssStylesRef.current.mediaQuerys[classStyle])

          cssStyles += `\n${mq} \n`
          innerClasses.forEach(innerClass => {
            cssStyles += ` .${innerClass} {\n`
            cssStyles += ` ${makeCssRule({ toIterate: cssStylesRef.current.mediaQuerys[classStyle][innerClass] })}`
            cssStyles += ` }\n`
          })
          if (mq)
            cssStyles += `}\n`
        });

        cssStylesSheetRef.current = cssStyles
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
      if (breackPoint == "mobilex2" || breackPoint == "tablet" || breackPoint == "desktop" || breackPoint == "desktopx2" || breackPoint == "desktopx3") {
        setConfigComponent(
          {
            ...configComponent,
            mediaQuerys: {
              ...configComponent.mediaQuerys, [breackPoint]: { ...configComponent.mediaQuerys[breackPoint]?.[cssClass], ...conf }
            }
          }
        )
        cssStylesRef.current = {
          ...cssStylesRef.current,
          mediaQuerys: {
            ...configComponent.mediaQuerys, [breackPoint]: { ...configComponent.mediaQuerys[breackPoint]?.[cssClass], ...conf }
          }
        }
      } else {
        setConfigComponent(
          {
            ...configComponent,
            normalStyles: { ...configComponent.normalStyles, [cssClass]: conf },
          }
        )
        cssStylesRef.current = {
          ...cssStylesRef.current,
          normalStyles: { ...configComponent.normalStyles, [cssClass]: conf },
        }
      }

      handleActualConfig(cssClass)
      setHeadStyles([cssClass, conf])
    } else {
      setActualConfig(null)
      setOpenEditor(false)
    }
  }

  const deleteConfigStyle = (id) => {
    let alter
    if (breackPoint == "mobilex2" || breackPoint == "tablet" || breackPoint == "desktop" || breackPoint == "desktopx2" || breackPoint == "desktopx3") {
      alter = Object.assign({}, configComponent.mediaQuerys[breackPoint])
      delete alter[id]
      setConfigComponent({
        ...configComponent,
        mediaQuerys: {
          ...alter
        }
      })
      cssStylesRef.current = {
        ...cssStylesRef.current,
        mediaQuerys: {
          ...alter
        }
      }
    } else {
      alter = Object.assign({}, configComponent.normalStyles)
      delete alter[id]
      setConfigComponent({
        ...configComponent,
        normalStyles: {
          ...alter
        }
      })
      cssStylesRef.current = {
        ...cssStylesRef.current,
        normalStyles: {
          ...alter
        }
      }
      setHeadStyles()
    }
  }

  /**
   * Funcion para obtener la configuracion de los estilos del Elemento/Componente elegido.
   * @param {String|Number} id Nombre/Identidicador de la configuracion del Elemento/Componente elegido.
   * @returns Json de la configuracion del Elemento/Componente elegido.
   */
  const getConfigComponent = (id) => {
    if (breackPoint == "mobilex2" || breackPoint == "tablet" || breackPoint == "desktop" || breackPoint == "desktopx2" || breackPoint == "desktopx3") {
      return configComponent.mediaQuerys[breackPoint]?.[id] ? configComponent.mediaQuerys[breackPoint][id] : {}
    } else {
      return configComponent.normalStyles?.[id] ? configComponent.normalStyles[id] : {}
    }
  }

  return (
    <EditorContext.Provider
      value={{
        configComponent, setConfigComponent, handleEditComponent, openEditor, handleOpenEditor, actualConfig, handleActualConfig, deleteConfigStyle, getConfigComponent, cssStylesSheetRef
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}