import { useState } from "react"
import { useEditorProvider } from "../../context/EditorProvider"
import { useEffect } from "react"

const placeholder = {
  margin: "15px 0px"
}
const Div = ({ id }) => {
  const { configComponent, handleOpenEditor } = useEditorProvider()
  const [configOfComponent, setConfigOfComponent] = useState(placeholder)
  const [editorMode, setEditorMode] = useState("hover:border")

  useEffect(() => {
    if (configComponent) setConfigOfComponent(configComponent)
    // console.log(configComponent);
  }, [configComponent])


  return (
    <div className={`w-full h-96 bg-blue-300 ${editorMode}`}
      onClick={e => handleOpenEditor(
        {
          conf: configOfComponent?.[id] ? configOfComponent[id] : placeholder,
          name: id,
          open: true
        }
      )}
      style={configComponent?.[id] ? configComponent[id] : placeholder}>
    </div>
  )
}

export default Div