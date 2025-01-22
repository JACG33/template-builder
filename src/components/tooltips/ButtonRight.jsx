import "./buttonright.css"
const ButtonRight = ({ children, text, handleShowComponents, type }) => {
  return (
    <div style={{"--first-box":`--${text.split(" ")[0]}--${Math.ceil(Math.random()*999)}`}}>
      <button type="button" className="btn__tooltip"  onClick={e => handleShowComponents(type)}>
        {children}
      </button>
      <div className="bg-blue-500 font-sm p-2 transitions-all duration-50 shadow-lg fixed z-10 rounded-lg btn__tooltip__message">
        {text}
      </div>
    </div>
  )
}

export default ButtonRight