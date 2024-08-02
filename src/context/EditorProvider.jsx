import { createContext, useState, useRef } from "react";

export const EditorContext = createContext({
  configComponent: false,
  setConfigComponent: () => { },
  handleEditComponent: () => { },
  openEditor: false,
  setOpenEditor: () => { },
  handleOpenEditor: ({ conf, id, isSubComponent, open, cssClass, cssSelector = [], setUi = false }) => { },
  actualConfig: false,
  setActualConfig: () => { },
  handleActualConfig: ({ nameConfig, id, isSubComponent }) => { },
  deleteConfigStyle: (ids = []) => { },
  getConfigComponent: () => { },
  cssStylesSheetRef: null,
  setUiStyles: ({ uiStyles, uiStylesMediaquerys, scripts }) => { },
  scripstRef: {},
  componentCssSelectors: [],
  setComponentCssSelectors: () => { },


  breackPoint: String,
  setBreackPoint: () => { },
  handleBreackPoint: () => { },
  builderZoneRef: null,
  bkpoint: Object,
  previewMode: null,
  handlePreviewMode: () => { },
})

export function EditorProvider({ children }) {
  // Variables para el editor
  const [configComponent, setConfigComponent] = useState(
    {
      normalStyles: { body: {} },
      mediaQuerys: {}
    }
  )
  const [actualConfig, setActualConfig] = useState({ nameConfig: "", isSubComponent: false, idComponent: null })
  const [openEditor, setOpenEditor] = useState(false)
  const [componentCssSelectors, setComponentCssSelectors] = useState([])
  const cssStylesRef = useRef({
    normalStyles: { body: {} },
    mediaQuerys: {}
  })
  const scripstRef = useRef({})
  const cssStylesSheetRef = useRef(`* {\n  padding: 0px;\n  margin: 0px;\n  box-sizing: border-box;\n}\n`)

  // Variables para los breackpoints
  const [breackPoint, setBreackPoint] = useState("mobile")
  const [previewMode, setPreviewMode] = useState(false)
  const builderZoneRef = useRef(null)
  const bkpoint = {
    "": "",
    "mobile": "builder__zone--mobile",
    "mobilex2": "builder__zone--mobile2",
    "tablet": "builder__zone--tablet",
    "desktop": "builder__zone--desktop",
    "desktopx2": "builder__zone--desktopx2",
    "desktopx3": "builder__zone--desktopx3",
  }

  const handleEditComponent = (conf) => {
    if (previewMode == true) return
    if (openEditor == true) {
      if (breackPoint == "mobilex2" || breackPoint == "tablet" || breackPoint == "desktop" || breackPoint == "desktopx2" || breackPoint == "desktopx3") {
        setConfigComponent(
          {
            ...configComponent,
            mediaQuerys: {
              ...configComponent.mediaQuerys, [breackPoint]: { ...configComponent.mediaQuerys[breackPoint], [actualConfig.nameConfig]: { ...conf } }
            }
          }
        )
        cssStylesRef.current = {
          ...cssStylesRef.current,
          mediaQuerys: {
            ...cssStylesRef.current.mediaQuerys, [breackPoint]: { ...cssStylesRef.current.mediaQuerys[breackPoint], [actualConfig.nameConfig]: { ...conf } }
          }
        }
        setHeadStyles()
      } else {
        setConfigComponent(
          {
            ...configComponent,
            normalStyles: { ...configComponent.normalStyles, [actualConfig.nameConfig]: conf },
          }
        )
        cssStylesRef.current = {
          ...configComponent,
          normalStyles: { ...cssStylesRef.current.normalStyles, [actualConfig.nameConfig]: conf },
        }
        setHeadStyles()
      }
    }
  }

  /**
   * Funcion que asigna una configuracion de estilos.
   * @param {Object} opc Objeto de opciones.
   * @param {String} opc.nameConfig Nombre de la Configuracion/EstiloCss.
   * @param {String|Number} opc.id Identificador del componete.
   * @param {Boolean} opc.isSubComponent Booleano que determina si es un SubElelement. 
   * @returns 
   */
  const handleActualConfig = ({ nameConfig, id, isSubComponent }) => setActualConfig({ nameConfig, id, isSubComponent })

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
          // Evitar colocar selectores vacios
          if (Object.keys(cssStylesRef.current.normalStyles[classStyle]).length > 0) {
            cssStyles += `\n.${classStyle} {\n`
            cssStyles += makeCssRule({ toIterate: cssStylesRef.current.normalStyles[classStyle] })
            cssStyles += `}\n`
          }
        });

        // Setear Media Querys
        let mediaQuerysClasses = Object.keys(cssStylesRef.current.mediaQuerys)

        if (mediaQuerysClasses.length > 0) {
          mediaQuerysClasses?.forEach(mediaQueryClass => {
            let mq = setMediaQuerys(mediaQueryClass)
            let innerClasses = Object.keys(cssStylesRef.current.mediaQuerys[mediaQueryClass])

            if (mq != "") {
              cssStyles += `\n${mq} \n`
              innerClasses.forEach(innerClass => {
                // Evitar colocar selectores vacios
                if (Object.keys(cssStylesRef.current.mediaQuerys[mediaQueryClass][innerClass]).length > 0) {
                  cssStyles += ` .${innerClass} {\n`
                  cssStyles += `${makeCssRule({ toIterate: cssStylesRef.current.mediaQuerys[mediaQueryClass][innerClass] })}`
                  cssStyles += ` }\n`
                }
              })
              cssStyles += `}\n`
            }
          });

        }
        cssStylesSheetRef.current = cssStyles
      }
    }
  }

  /**
   * Funcion para abrir el editor de estilos del Elemento/Componente elegido.
   * @param {Object} opciones Json de opiones.
   * @param {Object} opcoines.conf Json de la configuracion del Elemento/Componente elegido.
   * @param {String|Number} opciones.id Nombre/Identidicador de la configuracion del Elemento/Componente elegido.
   * @param {Boolean} opciones.open Boolean que identifica si esta o no abierto el editor de estilos del Elemento/Componente elegido.
   */
  const handleOpenEditor = ({ conf, id, isSubComponent, open, cssClass, cssSelector = [], setUi = false }) => {
    if (previewMode == true) return
    if (open == true || setUi == true) {
      setOpenEditor(true)
      if (breackPoint == "mobilex2" || breackPoint == "tablet" || breackPoint == "desktop" || breackPoint == "desktopx2" || breackPoint == "desktopx3") {
        setConfigComponent(
          {
            ...configComponent,
            mediaQuerys: {
              ...configComponent.mediaQuerys, [breackPoint]: { ...configComponent.mediaQuerys?.[breackPoint], [cssClass]: conf }
            }
          }
        )
        cssStylesRef.current = {
          ...cssStylesRef.current,
          mediaQuerys: {
            ...cssStylesRef.current.mediaQuerys, [breackPoint]: { ...cssStylesRef.current.mediaQuerys?.[breackPoint], [cssClass]: conf }
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
      if (cssSelector.length > 0)
        setComponentCssSelectors(cssSelector)
      handleActualConfig({ nameConfig: cssClass, id, isSubComponent })
      setHeadStyles([cssClass, conf])
    } else {
      setComponentCssSelectors([])
      setActualConfig({ idComponent: null, isSubComponent: false, nameConfig: null })
      setOpenEditor(false)
    }
  }

  /**
   * Funcion que asigna los estilos css de un componente/template UI.
   * @param {Object} opc Objeto de opciones. 
   * @param {Object} opc.uiStyles Objeto de estilos css. 
   * @param {Object} opc.uiStylesMediaquerys Objeto de estilos css mediaquery. 
   * @param {Object} opc.scripts Scripts. 
   */
  const setUiStyles = ({ uiStyles, uiStylesMediaquerys, scripts }) => {
    setConfigComponent(
      {
        mediaQuerys: { ...configComponent.mediaQuerys, mobilex2: { ...configComponent.mediaQuerys?.mobilex2, ...uiStylesMediaquerys?.mobilex2 }, tablet: { ...configComponent.mediaQuerys?.tablet, ...uiStylesMediaquerys?.tablet }, desktop: { ...configComponent.mediaQuerys?.desktop, ...uiStylesMediaquerys?.desktop }, desktopx2: { ...configComponent.mediaQuerys?.desktopx2, ...uiStylesMediaquerys?.desktopx2 }, desktopx3: { ...configComponent.mediaQuerys?.desktopx3, ...uiStylesMediaquerys?.desktopx3 } },
        normalStyles: { ...configComponent.normalStyles, ...uiStyles },
      }
    )
    cssStylesRef.current = {
      mediaQuerys: { ...cssStylesRef.current.mediaQuerys, mobilex2: { ...cssStylesRef.current.mediaQuerys?.mobilex2, ...uiStylesMediaquerys?.mobilex2 }, tablet: { ...cssStylesRef.current.mediaQuerys?.tablet, ...uiStylesMediaquerys?.tablet }, desktop: { ...cssStylesRef.current.mediaQuerys?.desktop, ...uiStylesMediaquerys?.desktop }, desktopx2: { ...cssStylesRef.current.mediaQuerys?.desktopx2, ...uiStylesMediaquerys?.desktopx2 }, desktopx3: { ...cssStylesRef.current.mediaQuerys?.desktopx3, ...uiStylesMediaquerys?.desktopx3 } },
      normalStyles: { ...configComponent.normalStyles, ...uiStyles },
    }

    // Intento de dividir los scripts por evento
    let keyOfScript = Object.keys(scripts)
    scripstRef.current = {
      ...scripstRef.current,
      [scripts[keyOfScript[0]]['type']]: {
        ...scripstRef.current[scripts[keyOfScript[0]]['type']],
        ...scripts
      }
    }

    // scripstRef.current={...scripstRef.current,...scripts}
    setHeadStyles()
  }

  /**
   * Funcion que elimina la configuracion css del State y Ref.
   * @param {Array} ids Id a eliminar.
   */
  const deleteConfigStyle = (ids = []) => {
    let normal = Object.assign({}, configComponent.normalStyles)
    let cssQuerys = Object.assign({}, configComponent.mediaQuerys[breackPoint])
    let scripts = Object.assign({}, scripstRef.current)

    let keysQuerys = Object.keys(cssQuerys)

    let keysScripts = Object.keys(scripts)

    // Eliminar la configuracion
    ids.forEach(ele => {
      // Eliminar estilos
      delete normal[ele]
      // Eliminar scripts
      keysScripts.forEach(key => {
        if(Object.keys(scripts)?.length>0 && Object.keys(scripts[key]).length==0)
          delete scripts[key]
        else
          delete scripts[key]?.[ele]
      })
      keysQuerys.forEach(key => {
        // Eliminar cssQuerys
        delete cssQuerys[key][ele]
      })
    })

    // Actualizar State y Ref
    setConfigComponent({
      ...configComponent,
      normalStyles: { ...normal },
      mediaQuerys: { ...configComponent.mediaQuerys, [breackPoint]: { ...configComponent.mediaQuerys?.[breackPoint], ...cssQuerys } }
    })
    cssStylesRef.current = {
      ...cssStylesRef.current,
      normalStyles: { ...normal },
      mediaQuerys: { ...cssStylesRef.current.mediaQuerys, [breackPoint]: { ...cssStylesRef.current.mediaQuerys?.[breackPoint], ...cssQuerys } }
    }
    scripstRef.current = scripts
    setHeadStyles()
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


  /* 
    ************
    Funcionalidades para los breackpoints
    ************
  */
  /**
   * Funcion para resetear el width del BuilderZone cuando se cambia el tipo de BrackPoint
   */
  const reseteSizeBuilderZone = () => {
    builderZoneRef.current.querySelector(".builder__zone").style.width = null
  }

  const handleBreackPoint = (bkpoint) => {
    reseteSizeBuilderZone()
    setBreackPoint(bkpoint)
  }

  const handlePreviewMode = () => setPreviewMode(!previewMode)


  return (
    <EditorContext.Provider
      value={{
        configComponent, setConfigComponent, handleEditComponent, openEditor, handleOpenEditor, actualConfig, handleActualConfig, deleteConfigStyle, getConfigComponent, cssStylesSheetRef, setUiStyles, scripstRef, componentCssSelectors, setComponentCssSelectors,

        handleBreackPoint, breackPoint, builderZoneRef, bkpoint, previewMode, handlePreviewMode
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}