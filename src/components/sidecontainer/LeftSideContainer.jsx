import { XCircle } from "../svg"

const LeftSideContainer = ({ children, handleShowComponents }) => {
  return (
    <div className='bg-gray-800 z-0 rounded-tr-xl rounded-br-xl'>
      <div className="flex justify-end">
        <button type='button'
          onClick={e => handleShowComponents("")}
          className='px-2 py-1 rounded-lg'
        >
          <XCircle />
        </button>
      </div>
      {children}
    </div>
  )
}

export default LeftSideContainer