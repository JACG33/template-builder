import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useRef } from "react";
import { useDragAndDropProvider } from "../../hoks/useDragAndDropProvider";
import { useEditorProvider } from "../../hoks/useEditorProvider";

/**
 * Componente que renderiza los componentes elegidos en el Iframe.
 * @param {Object} opc Objeto de parametros.
 * @param {String} opc.TypeElement Etiqueta HTML del compoenente a renderizar.
 * @param {String} opc.placeholder Estilos css del compoenente a renderizar.
 * @param {String|Number} opc.id Identificador del compoenente a renderizar.
 * @param {import('react').ReactElement} opc.children Nodo ReactElement.
 * @param {String} opc.dataAttribute Atributo personalizado.
 * @param {String} opc.dataParent Atributo personalizado del padre del componente.
 * @param {Object} opc.aditionalAttributes Objeto de Atributos adicionales para el componente.
 * @param {Array} opc.cssSelector Array de clases css modificadoras para el componente.
 * @param {String} opc.innerText Texto del Componente.
 * @returns
 */
const BaseElement = ({
  TypeElement,
  placeholder,
  id,
  children,
  dataAttribute,
  dataParent,
  aditionalAttributes,
  cssSelector = [],
  innerText = "",
}) => {
  const { configComponent, handleOpenEditor, breackPoint } =
    useEditorProvider();
  const styles = useRef(placeholder);
  const { subElements, dragginComponent } = useDragAndDropProvider();

  if (
    breackPoint == "mobilex2" ||
    breackPoint == "tablet" ||
    breackPoint == "desktop" ||
    breackPoint == "desktopx2" ||
    breackPoint == "desktopx3"
  )
    styles.current = configComponent.mediaQuerys[breackPoint];
  else styles.current = configComponent.normalStyles;

  useEffect(() => {
    handleOpenEditor({
      conf: styles.current?.[`${TypeElement}${id}`]
        ? styles.current[`${TypeElement}${id}`]
        : placeholder,
      id,
      isSubComponent: dataParent?.parentId ? true : false,
      open: true,
      cssClass: `${TypeElement}${id}`,
      cssSelector,
      textComponent: innerText,
    });
  }, []);

  // Draggable Hook
  const draggable = useDraggable({
    id: `${id}-draggable`,
    data: {
      idIndex: id,
      id: `${TypeElement}${id}`,
      parent: dataParent?.parentId,
      nameComponent: dataAttribute,
    },
  });

  return (
    <>
      {dragginComponent == true && (
        <div style={{ position: "relative" }}>
          <InteractionAreas
            TypeElement={TypeElement}
            id={id}
            dataParent={dataParent}
          />
          <TypeElement
            onClickCapture={(e) => {
              e.preventDefault();
              handleOpenEditor({
                conf: styles.current?.[`${TypeElement}${id}`]
                  ? styles.current[`${TypeElement}${id}`]
                  : {},
                id,
                isSubComponent: dataParent?.parentId ? true : false,
                open: true,
                cssClass: `${TypeElement}${id}`,
                cssSelector,
                textComponent: innerText,
              });
            }}
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className={`${TypeElement}${id}`}
            {...aditionalAttributes}
          >
            {innerText}
            {children}
            {subElements.length > 0 &&
              subElements.map((Item) => {
                if (Item?.parentId == id)
                  return (
                    <Item.component
                      key={Item.id}
                      id={Item.id}
                      styles={Item?.styles}
                      dataParent={Item}
                      moreParams={Item?.moreParams}
                      cssSelector={Item.otherCssClases}
                      innerText={Item?.innerText}
                    />
                  );
              })}
          </TypeElement>
        </div>
      )}

      {dragginComponent == false && (
        <TypeElement
          onClickCapture={(e) => {
            e.preventDefault();
            handleOpenEditor({
              conf: styles.current?.[`${TypeElement}${id}`]
                ? styles.current[`${TypeElement}${id}`]
                : {},
              id,
              isSubComponent: dataParent?.parentId ? true : false,
              open: true,
              cssClass: `${TypeElement}${id}`,
              cssSelector,
              textComponent: innerText,
            });
          }}
          ref={draggable.setNodeRef}
          {...draggable.listeners}
          {...draggable.attributes}
          className={`${TypeElement}${id}`}
          {...aditionalAttributes}
        >
          {innerText}
          {children}
          {subElements.length > 0 &&
            subElements.map((Item) => {
              if (Item?.parentId == id)
                return (
                  <Item.component
                    key={Item.id}
                    id={Item.id}
                    styles={Item?.styles}
                    dataParent={Item}
                    moreParams={Item?.moreParams}
                    cssSelector={Item.otherCssClases}
                    innerText={Item?.innerText}
                  />
                );
            })}
        </TypeElement>
      )}
    </>
  );
};

function InteractionAreas({ id, TypeElement, dataParent }) {
  const extraParams = {
    idIndex: id,
    id: `${TypeElement}${id}`,
    parent: dataParent?.parentId,
    overArea: true,
  };
  // Top Droppable Hook
  const topDroppable = useDroppable({
    id: `${id}-topdroppable`,
    data: {
      typeElement: "topdroppable",
      ...extraParams,
    },
  });

  // Bottom Droppable Hook
  const bottomDroppable = useDroppable({
    id: `${id}-bottomdroppable`,
    data: {
      typeElement: "bottomdroppable",
      ...extraParams,
    },
  });

  // Center Droppable Hook
  const centerDroppable = useDroppable({
    id: `${id}-centerdroppable`,
    data: {
      typeElement: "centerdroppable",
      ...extraParams,
    },
  });

  return (
    <>
      <div
        ref={topDroppable.setNodeRef}
        {...topDroppable.listeners}
        {...topDroppable.attributes}
        style={{
          position: "absolute",
          pointerEvents: "none",
          zIndex: "0",
          background: topDroppable.isOver
            ? topDroppable.active?.data.current?.id !=
              topDroppable.over?.data.current?.id
              ? "red"
              : ""
            : "",
          top: "0px",
          height: "10px",
          width: "100%",
        }}
        data-tool="builder"
      />
      <div
        ref={centerDroppable.setNodeRef}
        {...centerDroppable.listeners}
        {...centerDroppable.attributes}
        style={{
          position: "absolute",
          pointerEvents: "none",
          zIndex: "0",
          background: centerDroppable.isOver
            ? centerDroppable.active?.data.current?.id !=
              centerDroppable.over?.data.current?.id
              ? "pink"
              : ""
            : "",
          top: "10px",
          bottom: "10px",
          width: "100%",
        }}
        data-tool="builder"
      />
      <div
        ref={bottomDroppable.setNodeRef}
        {...bottomDroppable.listeners}
        {...bottomDroppable.attributes}
        style={{
          position: "absolute",
          pointerEvents: "none",
          zIndex: "0",
          background: bottomDroppable.isOver
            ? bottomDroppable.active?.data.current?.id !=
              bottomDroppable.over?.data.current?.id
              ? "red"
              : ""
            : "",
          bottom: "0px",
          height: "10px",
          width: "100%",
        }}
        data-tool="builder"
      />
    </>
  );
}

export default BaseElement;
