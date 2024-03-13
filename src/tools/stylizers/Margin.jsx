const Margin = ({ handleChange, configTemplate }) => {
  return (
    <div>
      <span>Margin</span>
      <div className='grid grid-cols-2 gap-4 *:outline-none *:p-1'>
        <div className='w-full flex items-center gap-2'>
          <label htmlFor="mblock">Y</label>
          <input className='w-full' type="number" name="margin" data-block="true" id='mblock' data-position="0" min={0} onChange={handleChange} value={configTemplate?.margin ? configTemplate.margin[0] : 0} />
        </div>
        <div className='w-full flex items-center gap-2'>
          <label htmlFor="minline">X</label>
          <input className='w-full' type="number" name="margin" data-inline="true" id='minline' data-position="1" min={0}  onChange={handleChange} value={configTemplate?.margin ? configTemplate.margin[1] : 0} />
        </div>
      </div>
    </div>
  )
}

export default Margin