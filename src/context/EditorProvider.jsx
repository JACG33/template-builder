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
  cssStylesSheetRef: null,
})

export function EditorProvider({ children }) {

  const [configComponent, setConfigComponent] = useState(
    {
      normalStyles: {},
      mediaQuerys: {}
    }
  )
  const [actualConfig, setActualConfig] = useState()
  const [openEditor, setOpenEditor] = useState(false)
  const cssStylesRef = useRef({
    normalStyles: {},
    mediaQuerys: {}
  })
  const cssStylesSheetRef = useRef()
  const { breackPoint } = useBraeackPointProvider()

  const handleEditComponent = (conf) => {
    if (openEditor == true) {
      console.log({ conf });
      if (breackPoint == "mobilex2" || breackPoint == "tablet" || breackPoint == "desktop" || breackPoint == "desktopx2" || breackPoint == "desktopx3") {
        setConfigComponent(
          {
            normalStyles: {
              ...configComponent.normalStyles
            },
            mediaQuerys: {
              ...configComponent.mediaQuerys, [breackPoint]: { [actualConfig]: {...configComponent.mediaQuerys[breackPoint]?.[actualConfig],...conf} }
            }
          }
        )
        cssStylesRef.current = {
          normalStyles: {
            ...configComponent.normalStyles
          },
          mediaQuerys: {
            ...configComponent.mediaQuerys, [breackPoint]: { [actualConfig]: {...configComponent.mediaQuerys[breackPoint]?.[actualConfig],...conf} }
          }
        }
        setHeadStyles()
      } else {
        setConfigComponent(
          {
            normalStyles: { ...configComponent.normalStyles, [actualConfig]: conf },
            mediaQuerys: { ...configComponent.mediaQuerys }
          }
        )
        cssStylesRef.current = {
          normalStyles: { ...configComponent.normalStyles, [actualConfig]: conf },
          mediaQuerys: { ...configComponent.mediaQuerys }
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
      cssStyles += `.${data[0]} {\n`
      cssStyles += makeCssRule({ toIterate: data[1] })
      cssStyles += `}\n`

      cssStylesSheetRef.current = cssStyles

      setConfigComponent(
        {
          normalStyles: { ...configComponent.normalStyles, [data[0]]: data[1] },
          mediaQuerys: { ...configComponent.mediaQuerys }
        }
      )
      cssStylesRef.current = {
        normalStyles: { ...configComponent.normalStyles, [data[0]]: data[1] },
        mediaQuerys: { ...configComponent.mediaQuerys }
      }
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
      console.log({ conf, cssClass });
      if (breackPoint == "mobilex2" || breackPoint == "tablet" || breackPoint == "desktop" || breackPoint == "desktopx2" || breackPoint == "desktopx3") {
        console.log("mq");
        setConfigComponent(
          {
            normalStyles: {
              ...configComponent.normalStyles
            },
            mediaQuerys: {
              ...configComponent.mediaQuerys, [breackPoint]: { [actualConfig]: conf }
            }
          }
        )
        cssStylesRef.current = {
          normalStyles: {
            ...configComponent.normalStyles
          },
          mediaQuerys: {
            ...configComponent.mediaQuerys, [breackPoint]: { [actualConfig]: conf }
          }
        }
      } else {
        setConfigComponent(
          {
            normalStyles: { ...configComponent.normalStyles, [actualConfig]: conf },
            mediaQuerys: { ...configComponent.mediaQuerys }
          }
        )
        cssStylesRef.current = {
          normalStyles: { ...configComponent.normalStyles, [actualConfig]: conf },
          mediaQuerys: { ...configComponent.mediaQuerys }
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
        configComponent, setConfigComponent, handleEditComponent, openEditor, handleOpenEditor, actualConfig, handleActualConfig, deleteConfigStyle, getConfigComponent, setAditionalStyles, cssStylesSheetRef
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}