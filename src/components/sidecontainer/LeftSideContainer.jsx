import { XCircle } from "../svg"

const LeftSideContainer = ({ children, handleShowComponents }) => {
  return (
    <div className='bg-gray-800 z-0 rounded-tr-xl rounded-br-xl overflow-hidden resize-x min-w-46'>
      <div className="flex justify-end">
        <button type='button'
          onClick={() => handleShowComponents("")}
          className='px-2 py-1 rounded-lg cursor-pointer hover:text-red-500 transtion-all duration-250'
        >
          <XCircle />
        </button>
      </div>
      {children}
    </div>
  )
}

export default LeftSideContainer