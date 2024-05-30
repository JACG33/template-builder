import { useDragAndDropProvider } from '../../hoks/useDragAndDropProvider'
import { useEditorProvider } from '../../hoks/useEditorProvider'

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
    elem.style.outline = "1px solid red";
    elem.style.outlineOffset = "-2px"
  }

  const hoverOutElement = ({ cssClass = "" }) => {
    let ifr = document.querySelector(".builder__zone").contentWindow
    let elem = ifr.document.querySelector(`.${cssClass}`)
    elem.style.outline = null
    elem.style.outlineOffset = null
  }

  const handleSetOpenEditor = (id) => {
    const conf = getConfigComponent(id)
    handleOpenEditor({ conf, cssClass: id, open: true })
  }

  const tree = [];

  parentElements.map(parentElement => {
    let structure = {}

    structure.elemen = parentElement
    structure.sub = []

    subElements.map(subElement => {

      if (parentElement.id == subElement.parentId) structure.sub.push(subElement)

      subElements.map(subElement2 => {

        if (parentElement.id == subElement.parentId && subElement.id == subElement2.parentId) structure.sub.push(subElement2)

      })

    })

    tree.push(structure)

  })

  return (
    <>
      <span className='text-center'>Rendered Components</span>
      <div className='my-2 grid gap-2'>
        {tree?.length > 0 && tree.map(parent => {
          return (
            // ParentElement
            <div key={parent.elemen.id}>
              <div className='tree__element'
                onMouseOverCapture={e => hoverInElement({ cssClass: `${parent.elemen.type}${parent.elemen.id}` })}
                onMouseLeave={e => hoverOutElement({ cssClass: `${parent.elemen.type}${parent.elemen.id}` })}
              >
                <button type='button' onClick={e => handleSetOpenEditor(`${parent.elemen.type}${parent.elemen.id}`)} key={parent.elemen.id}>{`<${parent.elemen.type}>`}</button>
                <ButtonDelete handleDelete={handleDelete} type={parent.elemen.type} id={parent.elemen.id} />
              </div>

              {/* SubElements */}
              <div style={{ paddingLeft: "10px", marginLeft: "10px", borderLeft: "1px solid #fff" }}>
                <SubComponent subComponent={parent.sub} handleSetOpenEditor={handleSetOpenEditor} hoverInElement={hoverInElement} hoverOutElement={hoverOutElement} handleDelete={handleDelete} />
              </div>
            </div>
          )
        }
        )}
      </div>
    </>
  )
}

const ButtonDelete = ({ handleDelete, type, id }) => {
  return (
    <button type='button' className=' py-1 px-2 border border-red-600 rounded-lg hover:text-white hover:bg-red-600'
      onClick={e => handleDelete(`${type}${id}`)}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
    </button>
  )
}

const SubComponent = ({ subComponent = [], hoverInElement, hoverOutElement, handleSetOpenEditor, handleDelete }) => {
  return (
    <>
      {
        subComponent.length > 0 && subComponent.map(sub => {
          return (
            <div key={sub.id}>
              <div className='tree__element'
                onMouseOverCapture={e => hoverInElement({ cssClass: `${sub.type}${sub.id}` })}
                onMouseLeave={e => hoverOutElement({ cssClass: `${sub.type}${sub.id}` })}
              >
                <button type='button' onClick={e => handleSetOpenEditor(`${sub.type}${sub.id}`)} key={sub.id}>{`<${sub.type}>`}</button>
                <ButtonDelete handleDelete={handleDelete} type={sub.type} id={sub.id} />
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default SideBarElementsRendered