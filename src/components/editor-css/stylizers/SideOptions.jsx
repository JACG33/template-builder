const SideOptions = ({ setSplitType, split }) => {
  return (
    <div className='overflow-hidden rounded-lg flex justify-center w-fit border border-blue-500'>
      <button type="button" data-splitype="joined" title="joined" onClick={e => setSplitType("joined")} className={`p-2 cursor-pointer ${split == "joined" ? " bg-blue-500" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-border-all"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M4 12l16 0" /><path d="M12 4l0 16" /></svg>
      </button>

      <button type="button" data-splitype="separated" title="separated" onClick={e => setSplitType("separated")} className={`p-2 cursor-pointer ${split == "separated" ? "bg-blue-500" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-border-sides"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8v8" /><path d="M20 16v-8" /><path d="M8 4h8" /><path d="M8 20h8" /></svg>
      </button>
    </div>
  )
}

export default SideOptions
