import { useDragAndDropProvider } from '../../context/DragDropProvider'
import { useEditorProvider } from '../../context/EditorProvider'
import { useState, useEffect } from 'react'

const BaseElement = ({ TypeElement, placeholder, id, children, dataAttribute }) => {
  const { configComponent, handleOpenEditor } = useEditorProvider()
  const [configOfComponent, setConfigOfComponent] = useState(placeholder)
  const { handleDragginElement, handleSubDrop, subItemsToTemplate } = useDragAndDropProvider()

  useEffect(() => {
    setConfigOfComponent(configComponent)
    // console.log(configComponent);
  }, [configComponent])

  return (
    <TypeElement
      onClickCapture={e => {
        handleOpenEditor(
          {
            conf: configOfComponent?.[id] ? configOfComponent[id] : placeholder,
            name: id,
            open: true
          }
        )
      }}
      style={configComponent?.[id] ? configComponent[id] : placeholder}
      data-component={dataAttribute}
      data-idcomponent={id}
      draggable
      onDragStartCapture={e => handleDragginElement(e, id)}
      onDrop={e => handleSubDrop(e, id, TypeElement)}
    >
      {children}
      {subItemsToTemplate.length > 0 && subItemsToTemplate.map(Item => {
        if (Item.parentId == id) return (<Item.component key={Item.id} id={Item.id} />)
      })}
    </TypeElement>
  )
}

export default BaseElement