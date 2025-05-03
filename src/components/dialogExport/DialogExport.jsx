import { useState } from 'react';
import { useExportImportProvider } from '../../hoks/useExportImportProvider';
import { ClipBoard, ClipboardCheck, ExportIcon, XCircle } from "../svg";
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
                className='cursor-pointer py-1 px-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg'
              ><XCircle /></button>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <ButtonNav onClick={() => changeTabDialog("html")}>HTML</ButtonNav>
                <ButtonNav onClick={() => changeTabDialog("css")}>CSS</ButtonNav>
                <ButtonNav onClick={() => changeTabDialog("js")}>JS</ButtonNav>
              </div>
              <div>
                <ButtonNav title='Copy' onClick={copyCLipboard}>
                  {copied == true ?
                    <ClipboardCheck className='text-green-500' />
                    :
                    <ClipBoard />
                  }
                </ButtonNav>
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


const ButtonNav = ({ children, ...params }) => (<button type="button" className='py-1 px-2 text-white cursor-pointer rounded-lg bg-slate-700 hover:bg-slate-600 ' {...params}>{children}</button>)
