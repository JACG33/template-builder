import "./buttonright.css"
const ButtonRight = ({ children, text, handleShowComponents,type }) => {
  return (
    <button type="button" className="btn__tooltip" onClick={e=>handleShowComponents(type)}>
      <div className="btn__tooltip__message">
        {text}
      </div>
      {children}
    </button>
  )
}

export default ButtonRight