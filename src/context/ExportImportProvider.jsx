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

  const { cssStylesSheetRef } = useEditorProvider()
  const builderArea = useRef(null)
  const dialogExport = useRef(null)
  const [codeToShow, setCodeToShow] = useState({ html: "", css: "", js: "" })


  const cleanHtmlToExport = () => {
    let innerBuilder = document.querySelector("iframe").contentDocument.querySelector("body").querySelector("div[data-builderarea=builderArea]").cloneNode(true)
    innerBuilder.querySelectorAll("[data-tool=builder]").forEach(ele => ele.remove())
    return innerBuilder.innerHTML
  }

  const handleCloseModal = () => dialogExport.current.close()

  const getHtml = () => cleanHtmlToExport()
  const getCss = () => cssStylesSheetRef.current
  const getJs = () => document.querySelector("style[data-develope]").innerHTML

  const handleExport = () => {
    setCodeToShow({ ...codeToShow, html: getHtml(), css: getCss() })
    dialogExport.current.showModal()
  }

  return (
    <ExportImportContext.Provider
      value={{ builderArea, dialogExport, handleExport, handleCloseModal, codeToShow }}
    >
      {children}
    </ExportImportContext.Provider>
  )
}