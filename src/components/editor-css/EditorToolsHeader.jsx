const EditorToolsHeader = ({cssClass}) => {

  return (
    <>
      <div className='editor__tools__header'>
        <span>ClassName</span>
        <span className="editor__tools__header__classname">{cssClass}</span>
      </div>
    </>
  )
}

export default EditorToolsHeader