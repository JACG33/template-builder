import { useDragAndDropProvider } from '../../context/DragDropProvider'
import { useEditorProvider } from '../../context/EditorProvider'
import { useEffect, useRef } from 'react'

const BaseElement = ({ TypeElement, placeholder, id, children, dataAttribute }) => {
  const { configComponent, handleOpenEditor } = useEditorProvider()
  const styles = useRef(placeholder)
  const { handleDragginElement, handleSubDrop, subItemsToTemplate } = useDragAndDropProvider()

  useEffect(() => {
    styles.current = configComponent
  }, [configComponent])

  return (
    <TypeElement
      onClickCapture={e => {
        handleOpenEditor(
          {
            conf: styles.current?.[id] ? styles.current[id] : placeholder,
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