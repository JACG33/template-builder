import { useDragAndDropProvider } from "../../hoks/useDragAndDropProvider"
import { useEditorProvider } from "../../hoks/useEditorProvider"
import { useEffect, useRef } from 'react'

const BaseElement = ({ TypeElement, placeholder, id, children, dataAttribute, indexItem, isParentComponent }) => {
  const { configComponent, handleOpenEditor } = useEditorProvider()
  const styles = useRef(placeholder)
  const { handleDragginElement, handleSubDrop, subItemsToTemplate, handleSortComponents, handleOver, handleDropEnd } = useDragAndDropProvider()

  useEffect(() => {
    styles.current = configComponent
  }, [configComponent])

  useEffect(() => {
    handleOpenEditor(
      {
        conf: styles.current?.[`${TypeElement}${id}`] ? styles.current[`${TypeElement}${id}`] : placeholder,
        name: id,
        open: true,
        cssClass:`${TypeElement}${id}`
      }
    )
  }, [])

  return (
    <TypeElement
      onClickCapture={e => {
        handleOpenEditor(
          {
            conf: styles.current?.[`${TypeElement}${id}`] ? styles.current[`${TypeElement}${id}`] : placeholder,
            name: id,
            open: true,
            cssClass:`${TypeElement}${id}`
          }
        )
      }}
      // style={configComponent?.[`${TypeElement}${id}`] ? configComponent[`${TypeElement}${id}`] : placeholder}
      className={`${TypeElement}${id}` }
      data-component={dataAttribute}
      data-idcomponent={id}
      draggable
      onDragStartCapture={e => handleDragginElement(e, id, indexItem)}
      onDropCapture={e => handleSubDrop(e, id, TypeElement)}
      onDragOver={e => { handleOver(e, indexItem, isParentComponent) }}
      onDragEnd={e => { handleDropEnd(e,isParentComponent) }}
    >
      {children}
      {subItemsToTemplate.length > 0 && subItemsToTemplate.map((Item, indexSubItem) => {
        if (Item.parentId == id) return (<Item.component key={Item.id} id={Item.id} indexItem={indexSubItem} isParentComponent={false} />)
      })}
    </TypeElement>
  )
}

export default BaseElement