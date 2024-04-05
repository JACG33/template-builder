import { XCircle } from "../svg"

const LeftSideContainer = ({ children, handleShowComponents }) => {
  return (
    <>
      <div className='absolute z-0 px-2 h-screen top-0 left-[50px] bg-slate-700 componets__dialog componets__dialog--show'>
        <div className="flex justify-end">
          <button type='button'
            onClick={handleShowComponents}
            className='py-1 px-2 bg-red-600 text-white hover:bg-red-500 rounded-lg'
          >
            <XCircle />
          </button>
        </div>
        {children}
      </div>
    </>
  )
}

export default LeftSideContainer