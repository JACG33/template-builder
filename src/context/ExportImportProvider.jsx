import { createContext, useRef, useState } from 'react'
import { useEditorProvider } from '../hoks/useEditorProvider'

export const ExportImportContext = createContext({
  builderArea: null,
  dialogExport: null,
  handleExport: () => { },
  handleCloseModal: () => { },
  codeToShow: {},
  setCodeToShow: () => { },
})

export function ExportImportProvider({ children }) {

  const { configComponent } = useEditorProvider()
  const builderArea = useRef(null)
  const dialogExport = useRef(null)
  const [codeToShow, setCodeToShow] = useState({ html: "", css: "", js: "" })

  const handleCloseModal = () => {
    dialogExport.current.close()
    dialogExport.current.querySelector("#dialogbody").innerHTML = null
  }

  const getHtml = () => builderArea.current.innerHTML
  const getCss = () => document.querySelector("style[data-develope]")?.innerHTML?document.querySelector("style[data-develope]").innerHTML:""
  const getJs = () => document.querySelector("style[data-develope]").innerHTML

  const handleExport = () => {
    setCodeToShow({ ...codeToShow, html: getHtml(), css: getCss() })
    dialogExport.current.showModal()
  }

  return (
    <ExportImportContext.Provider
      value={{
        builderArea, dialogExport, handleExport, handleCloseModal, codeToShow
      }}
    >
      {children}
    </ExportImportContext.Provider>
  )
}