const EditorToolsHeader = ({cssClass}) => {

  return (
    <>
      <div className='flex gap-2 justify-around items-center my-2 editot__tools__header'>
        <span>ClassName {cssClass}</span>
      </div>
    </>
  )
}

export default EditorToolsHeader