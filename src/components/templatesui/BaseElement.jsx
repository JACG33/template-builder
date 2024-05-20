import { useDraggable, useDroppable } from '@dnd-kit/core'
import { useEffect, useRef } from 'react'
import { useBraeackPointProvider } from '../../hoks/useBreackPointProvider'
import { useDragAndDropProvider } from "../../hoks/useDragAndDropProvider"
import { useEditorProvider } from "../../hoks/useEditorProvider"

const BaseElement = ({ TypeElement, placeholder, id, children, dataAttribute, indexItem, isParentComponent, dataParent }) => {
  const { configComponent, handleOpenEditor } = useEditorProvider()
  const styles = useRef(placeholder)
  const { subItemsToTemplate } = useDragAndDropProvider()
  const { breackPoint } = useBraeackPointProvider()

  if (breackPoint == "mobilex2" || breackPoint == "tablet" || breackPoint == "desktop" || breackPoint == "desktopx2" || breackPoint == "desktopx3")
    styles.current = configComponent.mediaQuerys[breackPoint]
  else
    styles.current = configComponent.normalStyles

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


  // Draggable Hook
  const draggable = useDraggable({
    id: `${id}-draggable`,
    data: {
      idIndex: id,
      id: `${TypeElement}${id}`,
      parent: dataParent?.parentId,
      nameComponent: dataAttribute
    }
  })


  // Droppable Hook
  const droppable = useDroppable({
    id: `${id}-droppable`,
    data: {
      idIndex: id,
      id: `${TypeElement}${id}`,
      parent: dataParent?.parentId,
      overArea:true
    }
  })


  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      style={{ position: "relative" }}
    >
      <InteractionAreas TypeElement={TypeElement} id={id} dataParent={dataParent} />

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
        ref={droppable.setNodeRef}
        {...droppable.listeners}
        {...droppable.attributes}

        className={`${TypeElement}${id}`}
        data-component={dataAttribute}
        data-idcomponent={id}
        data-typehtml={TypeElement}
        data-dragindex={indexItem}
        data-parent={dataParent?.parentId}

      >
        {children}
        {subItemsToTemplate.length > 0 && subItemsToTemplate.map((Item, indexSubItem) => {
          if (Item?.parentId == id) return (<Item.component key={Item.id} id={Item.id} indexItem={indexSubItem} isParentComponent={false} dataParent={Item} />)
        })}
      </TypeElement>
    </div>
  )
}

function InteractionAreas({ id, TypeElement, dataParent }) {

  // Top Droppable Hook
  const topDroppable = useDroppable({
    id: `${id}-topdroppable`,
    data: {
      typeElement: "topdroppable",
      idIndex: id,
      id: `${TypeElement}${id}`,
      parent: dataParent?.parentId,
      overArea:true
    }
  })

  // Bottom Droppable Hook
  const bottomDroppable = useDroppable({
    id: `${id}-bottomdroppable`,
    data: {
      typeElement: "bottomdroppable",
      idIndex: id,
      id: `${TypeElement}${id}`,
      parent: dataParent?.parentId,
      overArea:true
    }
  })

  // Center Droppable Hook
  const centerDroppable = useDroppable({
    id: `${id}-centerdroppable`,
    data: {
      typeElement: "centerdroppable",
      idIndex: id,
      id: `${TypeElement}${id}`,
      parent: dataParent?.parentId,
      overArea:true
    }
  })

  return (
    <>
      <div
        ref={topDroppable.setNodeRef}
        {...topDroppable.listeners}
        {...topDroppable.attributes}
        style={{ position: "absolute", pointerEvents: "none", zIndex: "0", background: topDroppable.isOver ? topDroppable.active?.data.current?.id != topDroppable.over?.data.current?.id ? "red" : "" : "", top: "0px", height: "10px", width: "100%" }}
        data-tool="builder"
      />
      <div
        ref={centerDroppable.setNodeRef}
        {...centerDroppable.listeners}
        {...centerDroppable.attributes}
        style={{ position: "absolute", pointerEvents: "none", zIndex: "0", background: centerDroppable.isOver ? centerDroppable.active?.data.current?.id != centerDroppable.over?.data.current?.id ? "pink" : "" : "", top: "10px", bottom: "10px", width: "100%" }}
        data-tool="builder"
      />
      <div
        ref={bottomDroppable.setNodeRef}
        {...bottomDroppable.listeners}
        {...bottomDroppable.attributes}
        style={{ position: "absolute", pointerEvents: "none", zIndex: "0", background: bottomDroppable.isOver ? bottomDroppable.active?.data.current?.id != bottomDroppable.over?.data.current?.id ? "red" : "" : "", bottom: "0px", height: "10px", width: "100%" }}
        data-tool="builder"
      />
    </>
  )


}

export default BaseElement