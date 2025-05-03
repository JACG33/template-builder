import "./buttonright.css"
const ButtonRight = ({ children, text, handleShowComponents, type }) => {
  return (
    <div className="hover:bg-blue-500 rounded-lg transitions-all duration-200" style={{ "--first-box": `--${text.split(" ")[0]}--${Math.ceil(Math.random() * 999)}` }}>
      <button type="button" className="btn__tooltip m-auto p-2 rounded-lg text-white cursor-pointer flex justify-center items-center" onClick={() => handleShowComponents(type)}>
        {children}
      </button>
      <div className="bg-blue-500 font-sm p-2 transitions-all duration-200 shadow-lg fixed left-[5px] z-10 rounded-lg btn__tooltip__message">
        {text}
      </div>
    </div>
  )
}

export default ButtonRight