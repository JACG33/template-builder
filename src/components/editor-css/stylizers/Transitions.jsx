const Transitions = ({handleChange,configTemplate}) => {
  return (
    <div className="display__select__wp">
      <label htmlFor="transition">Transitions</label>
      <input className='w-full' type="text" id="transition" name="transition" onChange={handleChange} value={configTemplate?.transition ? configTemplate.transition : ""} />
    </div>
  )
}

export default Transitions