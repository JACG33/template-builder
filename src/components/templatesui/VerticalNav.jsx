import { useEffect } from "react"
import { useState } from "react"
import { useEditorProvider } from "../../context/EditorProvider"

const placeholder = {
  padding: "15px 1px"
}

const VerticalNav = ({ id }) => {
  const { configComponent, handleOpenEditor } = useEditorProvider()
  const [configOfComponent, setConfigOfComponent] = useState(placeholder)
  const [editorMode, setEditorMode] = useState("hover:border")

  useEffect(() => {
    if (configComponent) setConfigOfComponent(configComponent)
    // console.log(configComponent);
  }, [configComponent])


  return (
    <nav className={`w-full h-24 bg-blue-300 ${editorMode}`}
      onClick={e => handleOpenEditor(
        {
          conf: configOfComponent?.[id] ? configOfComponent[id] : placeholder,
          name: id,
          open: true
        }
      )}
      style={configComponent?.[id] ? configComponent[id] : placeholder}>
      <div className="bg-indigo-500 w-full h-full"></div>
    </nav>
  )
}

export default VerticalNav