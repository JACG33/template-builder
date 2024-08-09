import React from "react";
import { useDragAndDropProvider } from "../../../hoks/useDragAndDropProvider";
import { useEditorProvider } from "../../../hoks/useEditorProvider";
import { useState } from "react";

const EditorTextOfComponents = () => {
  const {changeTextOfComponent }=useDragAndDropProvider()
  const { actualConfig,textOfComponent}=useEditorProvider()

  const [texta,setTexta]=useState(textOfComponent)

  const hdlTexta = (e) => {
    setTexta(e.target.textContent)
    console.log(e.target.value)
    changeTextOfComponent({id:actualConfig.id,isSubComponent:actualConfig.isSubComponent,text:e.target.value})
  }

  return <>
    <textarea name="" id="" onChange={hdlTexta} style={{resize:"none",height:"300px"}} value={texta}>
      {texta}
    </textarea>
  </>
}

export default EditorTextOfComponents