const EditorToolsHeader = ({ cssClass }) => {

  return (
    <div className='grid gap-2 text-center py-4'>
      <span>ClassName</span>
      <span className="editor__tools__header__classname">{cssClass}</span>
    </div>
  )
}

export default EditorToolsHeader