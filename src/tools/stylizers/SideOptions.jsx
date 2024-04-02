const SideOptions = ({ setSplitType, split }) => {
  return (
    <div className='flex justify-between rounded-lg bg-red-300 min-w-[80px] w-[80px] overflow-hidden'>
      <button type="button" data-splitype="joined" onClick={e => setSplitType("joined")} className={`relative py-1 px-2 cursor-pointer hover:bg-white hover:text-red-300 ${split == "joined" ? " bg-white text-red-300" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-border-all"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M4 12l16 0" /><path d="M12 4l0 16" /></svg>
      </button>

      <button type="button" data-splitype="separated" onClick={e => setSplitType("separated")} className={`relative py-1 px-2 cursor-pointer hover:bg-white hover:text-red-300 ${split == "separated" ? "bg-white text-red-300" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-border-sides"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8v8" /><path d="M20 16v-8" /><path d="M8 4h8" /><path d="M8 20h8" /></svg>
      </button>
    </div>
  )
}

export default SideOptions
