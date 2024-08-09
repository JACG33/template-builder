const Cursor = ({ handleChange, configTemplate }) => {

  return (
    <>
      <div className="display__select__wp">
        <span>Cursor</span>
        <select name="cursor" id="" onChange={handleChange} value={configTemplate?.cursor ? configTemplate.cursor : ""}>
          <option value="">Select Cursor</option>
          <option value="auto">Auto</option>
          <option value="default">Default</option>
          <option value="none">None</option>
          <option value="context-menu">Context-Menu</option>
          <option value="help">Help</option>
          <option value="pointer">Pointer</option>
          <option value="progress">Progress</option>
          <option value="wait">Wait</option>
          <option value="cell">Cell</option>
          <option value="crosshair">Crosshair</option>
          <option value="text">Text</option>
          <option value="vertical-text">Vertical-Text</option>
          <option value="vertical-alias">Vertical-Alias</option>
          <option value="copy">Copy</option>
          <option value="move">Move</option>
          <option value="no-drop">No-Drop</option>
          <option value="no-allowed">No-Allowed</option>
          <option value="all-scroll">All-Scroll</option>
          <option value="col-resize">Col-Resize</option>
          <option value="row-resize">Row-Resize</option>
          <option value="n-resize">n-resize</option>
          <option value="e-resize">e-resize</option>
          <option value="s-resize">s-resize</option>
          <option value="w-resize">w-resize</option>
          <option value="ns-resize">ns-resize</option>
          <option value="ew-resize">ew-resize</option>
          <option value="ne-resize">ne-resize</option>
          <option value="nw-resize">nw-resize</option>
          <option value="se-resize">se-resize</option>
          <option value="sw-resize">sw-resize</option>
          <option value="nesw-resize">nesw-resize</option>
          <option value="nwse-resize">nwse-resize</option>
        </select>
      </div>
    </>
  )
}

export default Cursor