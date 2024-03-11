import { useEditorProvider } from '../../context/EditorProvider'
import { useState, useEffect } from 'react'

const BaseElement = ({ TypeElement, placeholder, id, children }) => {
  const { configComponent, handleOpenEditor } = useEditorProvider()
  const [configOfComponent, setConfigOfComponent] = useState(placeholder)
  const [editorMode, setEditorMode] = useState("hover:border")


  useEffect(() => {
    if (configComponent) setConfigOfComponent(configComponent)
    // console.log(configComponent);
  }, [configComponent])

  return (
    <TypeElement className={`${editorMode}`}
      onClick={e => handleOpenEditor(
        {
          conf: configOfComponent?.[id] ? configOfComponent[id] : placeholder,
          name: id,
          open: true
        }
      )}
      style={configComponent?.[id] ? configComponent[id] : placeholder}>
      {children}
    </TypeElement>
  )
}

export default BaseElement