import { useState, useEffect } from "react"
import { useEditorProvider } from "../../context/EditorProvider"

const placeholder = {
  borderRadius: "8px",
  padding:"8px 10px"
}
const Button = ({ id }) => {
  const { configComponent, handleOpenEditor } = useEditorProvider()
  const [configOfComponent, setConfigOfComponent] = useState(placeholder)
  const [editorMode, setEditorMode] = useState("hover:border")

  useEffect(() => {
    if (configComponent) setConfigOfComponent(configComponent)
    // console.log(configComponent);
  }, [configComponent])


  return (
    <button type="button" className={`bg-blue-600 text-white  ${editorMode}`}
      onClick={e => handleOpenEditor(
        {
          conf: configOfComponent?.[id] ? configOfComponent[id] : placeholder,
          name: id,
          open: true
        }
      )}
      style={configComponent?.[id] ? configComponent[id] : placeholder}>
      Click
    </button>
  )
}

export default Button