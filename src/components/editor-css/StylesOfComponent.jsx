const StylesOfComponent = ({ handleChange, configTemplate, breackPoint, actualConfig, stylesString }) => {
  let jsonStyles = []

  if (stylesString.current != undefined && Object.keys(stylesString.current).length > 0) {
    for (const key in stylesString.current) {
      jsonStyles.push([key, stylesString.current[key]])
    }
  }

  return (
    <div className="grid gap-1">
      {jsonStyles.length > 0 && jsonStyles.map((style, index) => <div key={index} style={{display:"grid",gridTemplateColumns:"75% 1fr",gap:"0.5rem"}}>
        <span style={{textOverflow:"ellipsis",textWrap:"nowrap",overflow:"hidden"}} title={`${style[0]}: ${style[1]} ;`}>{`${style[0]}: ${style[1]} ;`}</span>
        <button type="button"  onClick={e => handleChange({ target: { value: "", name: style[0] } })}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        </button>
      </div>)}
    </div>
  )
}

export default StylesOfComponent