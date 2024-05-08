import { useEffect, useRef } from 'react'
import { useDragAndDropProvider } from "../../hoks/useDragAndDropProvider"
import { useEditorProvider } from "../../hoks/useEditorProvider"

const BaseElement = ({ TypeElement, placeholder, id, children, dataAttribute, indexItem, isParentComponent, dataParent }) => {
  const { configComponent, handleOpenEditor } = useEditorProvider()
  const styles = useRef(placeholder)
  const { handleDragginElement, handleSubDrop, subItemsToTemplate, handleOver, handleDropEnd } = useDragAndDropProvider()

  useEffect(() => {
    styles.current = configComponent
  }, [configComponent])

  useEffect(() => {
    handleOpenEditor(
      {
        conf: styles.current?.[`${TypeElement}${id}`] ? styles.current[`${TypeElement}${id}`] : placeholder,
        name: id,
        open: true,
        cssClass: `${TypeElement}${id}`
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
            cssClass: `${TypeElement}${id}`
          }
        )
      }}
      // style={configComponent?.[`${TypeElement}${id}`] ? configComponent[`${TypeElement}${id}`] : placeholder}
      className={`${TypeElement}${id}`}
      data-component={dataAttribute}
      data-idcomponent={id}
      data-typehtml={TypeElement}
      data-dragindex={indexItem}
      data-parent={dataParent?.parentId}
      draggable
      onDragStartCapture={e => handleDragginElement({ e }, id, indexItem)}
      onDropCapture={e => handleSubDrop(e, id, TypeElement)}
      onDragOverCapture={e => { handleOver(e) }}
      onDragEnd={e => { handleDropEnd(e, isParentComponent) }}
      onMouseOverCapture={e => { e.target.style.outline = "1px solid red"; e.target.style.outlineOffset = "-2px" }}
      onMouseLeave={e => { e.target.style.outline = null; e.target.style.outlineOffset = null }}
    >
      {children}
      {subItemsToTemplate.length > 0 && subItemsToTemplate.map((Item, indexSubItem) => {
        if (Item?.parentId == id) return (<Item.component key={Item.id} id={Item.id} indexItem={indexSubItem} isParentComponent={false} dataParent={Item} />)
      })}
    </TypeElement>
  )
}

export default BaseElement