import { useEffect, useState } from 'react'
import { useEditorProvider } from '../context/EditorProvider'
import EditorToolsHeader from './EditorToolsHeader'
import { BackgroundColor, BorderRadius, Margin, Padding } from './stylizers'
import { STYLES } from '../constants/styles'

const EditorTools = () => {
  const [configTemplate, setConfigTemplate] = useState(STYLES)
  const { configComponent, handleEditComponent, actualConfig } = useEditorProvider()
  useEffect(() => {
    const alterConf = { ...configComponent[actualConfig] }
    for (const iterator in alterConf) {
      if (typeof alterConf[iterator] == 'string' && alterConf[iterator].includes("px")) {
        alterConf[iterator] = alterConf[iterator]?.replaceAll("px", "").split(" ")
      }
      if (typeof alterConf[iterator] == 'string' && alterConf[iterator].includes("%")) {
        alterConf[iterator] = alterConf[iterator]?.replaceAll("%", "").split(" ")
      }
    }
    setConfigTemplate(alterConf)
  }, [configComponent])


  const handleChange = (e) => {
    const { target } = e
    if (target.name == "padding") {
      const padding = configTemplate.padding ? configTemplate.padding : ['0', '0']
      target.dataset.block ? padding[0] = target.value : padding[1] = target.value
      setConfigTemplate({ ...configTemplate, [target.name]: padding })
      handleEditComponent({ ...configTemplate, [target.name]: `${padding[0]}px ${padding[1]}px` })
    }
    if (target.name == "margin") {
      const margin = configTemplate.margin ? configTemplate.margin : ['0', '0']
      target.dataset.block ? margin[0] = target.value : margin[1] = target.value
      setConfigTemplate({ ...configTemplate, [target.name]: margin })
      handleEditComponent({ ...configTemplate, [target.name]: `${margin[0]}px ${margin[1]}px` })
    }
    if (target.name == "borderRadius") {
      let borderRadius = target.value
      setConfigTemplate({ ...configTemplate, [target.name]: [borderRadius] })
      handleEditComponent({ ...configTemplate, [target.name]: `${borderRadius}px` })
    }
    if (target.name == "backgroundColor") {
      let backgroundColor = target.value.toLocaleUpperCase()
      setConfigTemplate({ ...configTemplate, [target.name]: [backgroundColor] })
      handleEditComponent({ ...configTemplate, [target.name]: `${backgroundColor}` })
    }
  }

  return (
    <div className='px-2'>
      <EditorToolsHeader />
      <Padding configTemplate={configTemplate} handleChange={handleChange} />
      <Margin configTemplate={configTemplate} handleChange={handleChange} />
      <BorderRadius configTemplate={configTemplate} handleChange={handleChange} />
      <BackgroundColor configTemplate={configTemplate} handleChange={handleChange} />
    </div>
  )
}

export default EditorTools