import { createContext, useContext, useState } from "react";

const EditorContext = createContext({
  configComponent: false,
  setConfigComponent: () => { },
  handleEditComponent: () => { },
  openEditor: false,
  setOpenEditor: () => { },
  handleOpenEditor: ({ conf, name, open }) => { },
  actualConfig: false,
  setActualConfig: () => { },
  handleActualConfig: () => { },
  deleteConfigStyle: () => { }
})

export function EditorProvider({ children }) {

  const [configComponent, setConfigComponent] = useState()
  const [actualConfig, setActualConfig] = useState()
  const [openEditor, setOpenEditor] = useState(false)

  const handleEditComponent = (conf) => setConfigComponent({ ...configComponent, [actualConfig]: conf })

  const handleActualConfig = (nameConfig) => {
    setActualConfig(nameConfig)
  }

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


  return (
    <EditorContext.Provider
      value={{
        configComponent, setConfigComponent, handleEditComponent, openEditor, handleOpenEditor, actualConfig, handleActualConfig, deleteConfigStyle
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}


export const useEditorProvider = () => useContext(EditorContext)