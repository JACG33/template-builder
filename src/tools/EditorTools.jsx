import { useEffect, useState, useRef } from 'react'
import { useEditorProvider } from '../hoks/useEditorProvider'
import EditorToolsHeader from './EditorToolsHeader'
import { BackgroundColor, BorderRadius, Display, Height, Margin, Padding, Width } from './stylizers'
import { STYLES } from '../constants/styles'

const EditorTools = () => {
  const [configTemplate, setConfigTemplate] = useState(STYLES)
  const stylesString = useRef();
  const { configComponent, handleEditComponent, actualConfig } = useEditorProvider()
  useEffect(() => {
    const alterConf = Object.assign({}, configComponent[actualConfig])
    for (const iterator in alterConf) {
      if (typeof alterConf[iterator] == 'string' && alterConf[iterator].includes("px")) {
        alterConf[iterator] = alterConf[iterator]?.replaceAll("px", "").split(" ")
      }
      if (typeof alterConf[iterator] == 'string' && alterConf[iterator].includes("%")) {
        alterConf[iterator] = alterConf[iterator]?.replaceAll("%", "").split(" ")
      }
    }
    stylesString.current = { ...configComponent[actualConfig] }
    setConfigTemplate(alterConf)
  }, [configComponent])


  const handleChange = (e) => {
    const { target } = e
    if (target.name == "padding") {
      const padding = configTemplate.padding ? configTemplate.padding : ['0', '0']
      padding[Number(target.dataset.position)] = target.value
      setConfigTemplate({ ...configTemplate, [target.name]: padding })
      stylesString.current = { ...stylesString.current, [target.name]: `${padding[0]}px ${padding[1]}px` }
    }
    if (target.name == "margin") {
      const margin = configTemplate.margin ? configTemplate.margin : ['0', '0']
      margin[Number(target.dataset.position)] = target.value
      setConfigTemplate({ ...configTemplate, [target.name]: margin })
      stylesString.current = { ...stylesString.current, [target.name]: `${margin[0]}px ${margin[1]}px` }
    }
    if (target.name == "borderRadius") {
      let borderRadius = target.value
      setConfigTemplate({ ...configTemplate, [target.name]: [borderRadius] })
      stylesString.current = { ...stylesString.current, [target.name]: `${borderRadius}px` }
    }
    if (target.name == "backgroundColor") {
      let backgroundColor = target.value.toLocaleUpperCase()
      setConfigTemplate({ ...configTemplate, [target.name]: [backgroundColor] })
      stylesString.current = { ...stylesString.current, [target.name]: `${backgroundColor}` }
    }
    if (target.name == "display" || target.name == "justifyContent" || target.name == "alignItems" || target.name == "flexDirection") {
      let display = target.value
      setConfigTemplate({ ...configTemplate, [target.name]: [display] })
      stylesString.current = { ...stylesString.current, [target.name]: `${display}` }
    }
    if (target.name == "gap") {
      let gap = target.value
      setConfigTemplate({ ...configTemplate, [target.name]: [gap] })
      stylesString.current = { ...stylesString.current, [target.name]: `${gap}px` }
    }
    if (target.name == "width" || target.name == "height") {
      let width = target.value
      let type = target.dataset.typewidth || target.dataset.typeheight
      setConfigTemplate({ ...configTemplate, [target.name]: [width] })
      stylesString.current = { ...stylesString.current, [target.name]: `${width}${type}` }
    }
    handleEditComponent({ ...stylesString.current })
  }

  return (
    <div className='px-2'>
      <EditorToolsHeader />
      <Width configTemplate={configTemplate} handleChange={handleChange} />
      <Height configTemplate={configTemplate} handleChange={handleChange} />
      <Padding configTemplate={configTemplate} handleChange={handleChange} />
      <Margin configTemplate={configTemplate} handleChange={handleChange} />
      <BorderRadius configTemplate={configTemplate} handleChange={handleChange} />
      <BackgroundColor configTemplate={configTemplate} handleChange={handleChange} />
      <Display configTemplate={configTemplate} handleChange={handleChange} />
    </div>
  )
}

export default EditorTools