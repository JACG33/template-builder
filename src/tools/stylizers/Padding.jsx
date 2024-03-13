const Padding = ({ handleChange, configTemplate }) => {
  return (
    <div>
      <span>Padding</span>
      <div className='grid grid-cols-2 gap-4 *:outline-none *:p-1'>
        <div className='w-full flex items-center gap-2'>
          <label htmlFor="block">Y</label>
          <input className='w-full' type="number" name="padding" data-block="true" id='block' min={0} data-position="0" onChange={handleChange} value={configTemplate?.padding ? configTemplate.padding[0] : 0} />
        </div>
        <div className='w-full flex items-center gap-2'>
          <label htmlFor="inline">X</label>
          <input className='w-full' type="number" name="padding" data-inline="true" id='inline' min={0} data-position="1" onChange={handleChange} value={configTemplate?.padding ? configTemplate.padding[1] : 0} />
        </div>
      </div>
    </div>
  )
}

export default Padding