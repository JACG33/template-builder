import { useState } from 'react'
import { useDragAndDropProvider } from '../../hoks/useDragAndDropProvider'
import { useEditorProvider } from '../../hoks/useEditorProvider'
import { MinusIcon, PlusIcon, TrashIcon } from '../svg'

const SideBarElementsRendered = () => {
  const { parentElements, subElements, handleDeleteComponent } = useDragAndDropProvider()
  const { handleOpenEditor, getConfigComponent } = useEditorProvider()

  const handleDelete = (configNmae = "") => {
    handleDeleteComponent(configNmae)
    handleOpenEditor({ open: false })
  }

  const hoverInElement = ({ cssClass = "" }) => {
    let ifr = document.querySelector(".builder__zone").contentWindow
    let elem = ifr.document.querySelector(`.${cssClass}`)
    if (elem) {
      elem.style.outline = "1px solid red";
      elem.style.outlineOffset = "-2px"
    }
  }

  const hoverOutElement = ({ cssClass = "" }) => {
    let ifr = document.querySelector(".builder__zone").contentWindow
    let elem = ifr.document.querySelector(`.${cssClass}`)
    if (elem) {
      elem.style.outline = null
      elem.style.outlineOffset = null
    }
  }

  const handleSetOpenEditor = ({ id, cssSelector = [] }) => {
    const conf = getConfigComponent(id)
    handleOpenEditor({ conf, cssClass: id, open: true, cssSelector })
  }

  const tree = [];
  const nodeMap = {};

  // console.log(subElements)

  // Primero, creamos los nodos para los elementos padres:
  parentElements.forEach(parent => {
    const node = { element: parent, sub: [] };
    nodeMap[parent.id] = node;
    // Se asume que los elementos de parentElements son de primer nivel
    tree.push(node);
  });

  // Ahora, recorremos los subElements para asignarlos a su padre correspondiente:
  subElements.forEach(sub => {
    const node = { element: sub, sub: [] };
    // Agregamos el nodo al diccionario usando su id para futuras búsquedas (en caso de tener sub-sub-elementos)
    nodeMap[sub.id] = node;
  
    // Buscamos el nodo padre usando el parentId del subElement
    const parentNode = nodeMap[sub.parentId];
  
    // Si encontramos el nodo padre, lo anidamos ahí:
    if (parentNode) {
      parentNode.sub.push(node);
    } else {
      // Si no se encuentra el nodo padre, lo agregamos al nivel raíz
      // (o se podría manejar como un huerfano de otra forma)
      tree.push(node);
    }
  });

  return (
    <>
      <span className='text-center'>Rendered Components</span>
      <div className='my-2 grid content-start p-1 gap-2 h-[calc(100%_-_70px)] overflow-y-auto' style={{ scrollbarWidth: 'thin' }}>
        {tree?.length > 0 && tree.map(parent => {
          if (parent.sub.length > 0) {
            return (
              // ParentElement
              <div key={parent.element.id}>
                <Tree
                  handleDelete={handleDelete}
                  handleSetOpenEditor={handleSetOpenEditor}
                  keyObject={parent}
                  onMouseOverCapture={() => hoverInElement({ cssClass: `${parent.element.type}${parent.element.id}` })}
                  onMouseLeave={() => hoverOutElement({ cssClass: `${parent.element.type}${parent.element.id}` })}>
          
                  {/* SubElements */}
                  <SubComponent subComponent={parent.sub} handleSetOpenEditor={handleSetOpenEditor} hoverInElement={hoverInElement} hoverOutElement={hoverOutElement} handleDelete={handleDelete} />
                </Tree>
                        
              </div>
            )
          } else {
            return (
              // ParentElement
              <div key={parent.element.id}>
                <div className='grid grid-cols-[1fr_40px] gap-1'
                  onMouseOverCapture={() => hoverInElement({ cssClass: `${parent.element.type}${parent.element.id}` })}
                  onMouseLeave={() => hoverOutElement({ cssClass: `${parent.element.type}${parent.element.id}` })}
                >
                  <button
                    className='p-1 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all duration-300 cursor-pointer'
                    type='button'
                    key={parent.element.id}
                    onClick={() => handleSetOpenEditor({ id: `${parent.element.type}${parent.element.id}`, cssSelector: parent.element.otherCssClases })}
                  >{`<${parent.element.type}>`}</button>
                  <ButtonDelete handleDelete={handleDelete} type={parent.element.type} id={parent.element.id} />
                </div>
              </div>
            )
          }
            
        }
        )}
      </div>
    </>
  )
}

const ButtonDelete = ({ handleDelete, type, id }) => {
  return (
    <button type='button' className='cursor-pointer py-1 px-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 rounded-lg p-1 cursor-pointer'
      onClick={() => handleDelete(`${type}${id}`)}>
      <TrashIcon />
    </button>
  )
}

const SubComponent = ({ subComponent = [], hoverInElement, hoverOutElement, handleSetOpenEditor, handleDelete }) => {
  return (
    <>
      {
        subComponent.length > 0 && subComponent.map(sub => {
          if (sub.sub && sub.sub.length > 0) {
            return (
              <div key={sub.element.id}>
                <Tree
                  handleDelete={handleDelete}
                  handleSetOpenEditor={handleSetOpenEditor}
                  keyObject={sub}
                  onMouseOverCapture={() => hoverInElement({ cssClass: `${sub.element.type}${sub.element.id}` })}
                  onMouseLeave={() => hoverOutElement({ cssClass: `${sub.element.type}${sub.element.id}` })}>
          
                  {/* SubElements */}
                  <SubComponent subComponent={sub.sub} handleSetOpenEditor={handleSetOpenEditor} hoverInElement={hoverInElement} hoverOutElement={hoverOutElement} handleDelete={handleDelete} />
                </Tree>
              </div>
            )
          } else {
            return (
              <div key={sub.element.id}>
                <div className='grid grid-cols-[1fr_40px] gap-1'
                  onMouseOverCapture={() => hoverInElement({ cssClass: `${sub.element.type}${sub.element.id}` })}
                  onMouseLeave={() => hoverOutElement({ cssClass: `${sub.element.type}${sub.element.id}` })}
                >
                  <button
                    className='p-1 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all duration-300 cursor-pointer'
                    type='button'
                    key={sub.element.id}
                    onClick={() => handleSetOpenEditor({ id: `${sub.element.type}${sub.element.id}`, cssSelector: sub.element.otherCssClases })}
                  >{`<${sub.element.type}>`}</button>
                  <ButtonDelete handleDelete={handleDelete} type={sub.type} id={sub.id} />
                </div>
              </div>
            )
          }
        })
      }
    </>
  )
}


const Branch = ({ children, className = "" }) => {
  return (
    <div className={`grid gap-1 pl-3 ml-3 border-l ${className}`}>
      {children}
    </div>
  )
}


const Tree = ({ children, keyObject, handleSetOpenEditor, handleDelete, ...params }) => {
  const [openTree, setOpenTree] = useState(false)

  const hdlOpenTree = () => setOpenTree(!openTree)

  return (

    <div className='grid gap-1'>
      <div className='grid grid-cols-[36px_1fr_40px] gap-1 cursor-pointer' {...params}>
        <button 
          className='p-1 rounded-lg border border-slate-500 hover:bg-slate-500 transition-all duration-300 cursor-pointer' 
          title={`${openTree ? "Close" : "Open"}`}
          onClick={hdlOpenTree}
        >
          {openTree && <MinusIcon />}
          {!openTree && <PlusIcon />}
        </button>
        <button
          type='button'
          className='p-1 rounded-lg hover:bg-slate-600 transition-all duration-300 cursor-pointer'
          key={keyObject.element.id}
          onClick={() => handleSetOpenEditor({ id: `${keyObject.element.type}${keyObject.element.id}`, cssSelector: keyObject.element.otherCssClases })}
        >
          <span>{`<${keyObject.element.type}>`}</span> 
        </button>
        <ButtonDelete handleDelete={handleDelete} type={keyObject.element.type} id={keyObject.element.id} />
      </div>
      <Branch className={`${openTree ? "" : "hidden"}`}>{children}</Branch>
    </div>

  )
}

export default SideBarElementsRendered