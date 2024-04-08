import "./buttonright.css"
const ButtonRight = ({ children, text, handleShowComponents }) => {
  return (
    <button type="button" className="btn__tooltip" onClick={handleShowComponents}>
      <div className="btn__tooltip__message">
        {text}
      </div>
      {children}
    </button>
  )
}

export default ButtonRight