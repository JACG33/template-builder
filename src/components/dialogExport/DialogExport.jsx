import { useState } from 'react';
import { useExportImportProvider } from '../../hoks/useExportImportProvider';
import { ExportIcon } from "../svg";
import SyntaxHighlight from '../syntaxhighlight/SyntaxHighlight';
import ButtonRight from "../tooltips/ButtonRight";

const DialogExport = () => {
  const { dialogExport, handleCloseModal, codeToShow } = useExportImportProvider()
  const { handleExport } = useExportImportProvider()
  const [actualTab, setActualTab] = useState("html")
  const [copied, setCopied] = useState(false)

  const changeTabDialog = (tab) => setActualTab(tab)

  const copyCLipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeToShow[actualTab])
      setCopied(true)
      setTimeout(() => setCopied(false), 500);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <dialog className="rounded-lg p-2 m-auto bg-gray-800 w-[90%] h-[90%]" ref={dialogExport} closedBy="any">
        <div className='grid grid-rows-[70px_1fr] h-full gap-2'>
          <div>
            <div className="flex justify-end items-center">
              <button type='button'
                onClick={handleCloseModal}
                className='py-1 px-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg'
              ><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg></button>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2 dialog__export__nav__area__btns'>
                <button type="button" onClick={e => changeTabDialog("html")} className='py-1 px-2 cursor-pointer rounded-lg bg-slate-700 hover:bg-slate-800 dialog__export__nav__area__btn'>HTML</button>
                <button type="button" onClick={e => changeTabDialog("css")} className='py-1 px-2 cursor-pointer rounded-lg bg-slate-700 hover:bg-slate-800 dialog__export__nav__area__btn'>CSS</button>
                <button type="button" onClick={e => changeTabDialog("js")} className='py-1 px-2 cursor-pointer rounded-lg bg-slate-700 hover:bg-slate-800 dialog__export__nav__area__btn'>JavaScript</button>
              </div>
              <div>
                <button type="button" className='py-1 px-2 cursor-pointer rounded-lg bg-slate-700 hover:bg-slate-800 dialog__export__nav__area__btn' title='Copy' onClick={copyCLipboard}>
                  {copied == true ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 icon icon-tabler icons-tabler-outline icon-tabler-clipboard-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 14l2 2l4 -4" /></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /></svg>
                  }
                </button>
              </div>
            </div>
          </div>
          <div className='overflow-y-auto rounded-lg dialog__export__wp__code'>
            {actualTab == "html" &&
              <SyntaxHighlight languageCss={"language-html"}>
                {codeToShow.html != "" ? codeToShow.html : "<!-- Html empty -->"}
              </SyntaxHighlight>
            }
            {actualTab == "css" &&
              <SyntaxHighlight languageCss={"language-css"}>
                {codeToShow.css != "" ? codeToShow.css : "/* Styles empty */"}
              </SyntaxHighlight>
            }
            {actualTab == "js" &&
              <SyntaxHighlight languageCss={"language-javascript"}>
                {codeToShow.js != "" ? codeToShow.js : "/* Scripts empty */"}
              </SyntaxHighlight>
            }

          </div>
        </div>
      </dialog>
      <ButtonRight text={"Export"} handleShowComponents={handleExport}>
        <ExportIcon />
      </ButtonRight>
    </div>
  )
}

export default DialogExport