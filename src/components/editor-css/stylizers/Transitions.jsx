const Transitions = ({handleChange,configTemplate}) => {
  return (
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="transition">Transitions</label>
      <input className='w-full px-2 py-1 text-gray-700 rounded-lg' type="text" id="transition" name="transition" onChange={handleChange} value={configTemplate?.transition ? configTemplate.transition : ""} />
    </div>
  )
}

export default Transitions