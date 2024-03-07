import { useEffect, useState } from 'react'
import { useEditorProvider } from '../context/EditorProvider'
import EditorToolsHeader from './EditorToolsHeader'
import { BorderRadius, Margin, Padding } from './stylizers'
import { STYLES } from '../constants/styles'

const EditorTools = () => {
  const [configTemplate, setConfigTemplate] = useState(STYLES)
  const { configComponent, handleEditComponent, actualConfig } = useEditorProvider()
  useEffect(() => {
    const alterConf = { ...configComponent[actualConfig] }
    for (const iterator in alterConf) {
      if (typeof alterConf[iterator] == 'string') {
        alterConf[iterator] = alterConf[iterator]?.replaceAll("px", "").split(" ")
      }
    }
    setConfigTemplate(alterConf)
  }, [configComponent])


  const handleChange = (e) => {
    const { target } = e
    if (target.name == "padding") {
      const padding = configTemplate.padding ? configTemplate.padding : ['0', '0']
      target.dataset.block ? padding[0] = target.value : padding[1] = target.value
      setConfigTemplate({ ...configTemplate, "padding": padding })
      handleEditComponent({ ...configTemplate, [target.name]: `${padding[0]}px ${padding[1]}px` })
    }
    if (target.name == "margin") {
      const margin = configTemplate.margin ? configTemplate.margin : ['0', '0']
      target.dataset.block ? margin[0] = target.value : margin[1] = target.value
      setConfigTemplate({ ...configTemplate, "margin": margin })
      handleEditComponent({ ...configTemplate, [target.name]: `${margin[0]}px ${margin[1]}px` })
    }
    if (target.name == "borderRadius") {
      let borderRadius = target.value
      setConfigTemplate({ ...configTemplate, "borderRadius": [borderRadius] })
      handleEditComponent({ ...configTemplate, "borderRadius": `${borderRadius}px` })
    }
  }

  return (
    <div className='px-2'>
      <EditorToolsHeader />
      <Padding configTemplate={configTemplate} handleChange={handleChange} />
      <Margin configTemplate={configTemplate} handleChange={handleChange} />
      <BorderRadius configTemplate={configTemplate} handleChange={handleChange} />
    </div>
  )
}

export default EditorTools