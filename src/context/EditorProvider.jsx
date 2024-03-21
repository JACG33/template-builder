import { createContext, useState } from "react";

export const EditorContext = createContext({
  configComponent: false,
  setConfigComponent: () => { },
  handleEditComponent: () => { },
  openEditor: false,
  setOpenEditor: () => { },
  handleOpenEditor: ({ conf, name, open }) => { },
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

  const handleEditComponent = (conf) => setConfigComponent({ ...configComponent, [actualConfig]: conf })

  const handleActualConfig = (nameConfig) => {
    setActualConfig(nameConfig)
  }

  /**
   * Funcion para abrir el editor de estilos del Elemento/Componente elegido.
   * @param {Object} opciones Json de opiones.
   * @param {Object} opcoines.conf Json de la configuracion del Elemento/Componente elegido.
   * @param {String|Number} opciones.name Nombre/Identidicador de la configuracion del Elemento/Componente elegido.
   * @param {Boolean} opciones.open Boolean que identifica si esta o no abierto el editor de estilos del Elemento/Componente elegido.
   */
  const handleOpenEditor = ({ conf, name, open }) => {
    if (open == true) {
      setOpenEditor(true)
      setConfigComponent({ ...configComponent, [name]: conf })
      handleActualConfig(name)
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


