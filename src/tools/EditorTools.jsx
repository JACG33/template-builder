import { useEffect, useState, useRef } from 'react'
import { useEditorProvider } from '../hoks/useEditorProvider'
import EditorToolsHeader from './EditorToolsHeader'
import { BackgroundColor, BorderRadius, Display, Height, Margin, Padding, Width } from './stylizers'
import { STYLES } from '../constants/styles'
import WrapperDropDown from './WrapperDropDown'

const cleanText = ({ text = "", letters = [] }) => {
  let clean = ""
  letters.forEach(letter => { if (text.includes(letter)) clean = text.replaceAll(letter, "") })
  return clean
}


const EditorTools = () => {
  const [configTemplate, setConfigTemplate] = useState(STYLES)
  const stylesString = useRef();
  const { configComponent, handleEditComponent, actualConfig } = useEditorProvider()

  useEffect(() => {
    const alterConf = Object.assign({}, configComponent[actualConfig])
    for (const iterator in alterConf) {
      let style = alterConf[iterator]
      if (typeof alterConf[iterator] == 'string' && (style.includes("px") || style.includes("%") || style.includes("em") || style.includes("rem") || style.includes("vh") || style.includes("vw"))) {
        let letters = ["px", "%", "em", "rem", "vh", "vw"]
        alterConf[iterator] = cleanText({ text: alterConf[iterator], letters }).split(" ")
      }
    }
    stylesString.current = { ...configComponent[actualConfig] }
    setConfigTemplate(alterConf)
  }, [configComponent])


  const handleChange = (e) => {
    const { target } = e
    // 
    if (target.name == "padding") {
      const padding = configTemplate?.[target.name] || STYLES.margin
      let type = target.dataset.sizetype
      if (target.dataset.type) {
        type = target.value
      } else {
        padding[Number(target.dataset.position)] = target.value
      }
      setConfigTemplate({ ...configTemplate, [target.name]: padding })
      stylesString.current = { ...stylesString.current, [target.name]: `${padding[0]}${type} ${padding[1]}${type} ${padding[2]}${type} ${padding[3]}${type}` }
    }

    // 
    if (target.name == "margin") {
      let padding =Object.assign([], configTemplate?.[target.name] || STYLES.margin)
      let type = target.dataset.sizetype
      let toSaveString = stylesString.current[target.name]?.split(" ") || STYLES.margin

      padding[Number(target.dataset.position)] = target.value
      toSaveString[Number(target.dataset.position)] = target.dataset.sizetype == "auto" ? target.dataset.sizetype : `${target.value}${type}`

      setConfigTemplate({ ...configTemplate, [target.name]: padding })
      stylesString.current = { ...stylesString.current, [target.name]: toSaveString.join(" ") }
    }

    // 
    if (target.name == "display" || target.name == "justifyContent" || target.name == "alignItems" || target.name == "flexDirection" || target.name == "backgroundColor") {
      let display = target.value
      setConfigTemplate({ ...configTemplate, [target.name]: [display] })
      stylesString.current = { ...stylesString.current, [target.name]: `${display}` }
    }

    // 
    if (target.name == "gap" || target.name == "borderRadius") {
      let gap = target.value
      setConfigTemplate({ ...configTemplate, [target.name]: [gap] })
      stylesString.current = { ...stylesString.current, [target.name]: `${gap}px` }
    }

    // 
    if (target.name == "width" || target.name == "height") {
      let width = target.value
      let type = target.dataset.sizetype
      let toSaveString = `${width}${type || ""}`
      let toSave = width
      if (type == "auto") {
        toSave = "auto"
        toSaveString = "auto"
      }
      if (target.dataset?.type == "select") {
        toSave = target.dataset.place
        toSaveString = `${target.dataset.place}${target.value}`
      }

      setConfigTemplate({ ...configTemplate, [target.name]: [toSave] })
      stylesString.current = { ...stylesString.current, [target.name]: toSaveString }
    }


    handleEditComponent({ ...stylesString.current })
  }

  return (
    <div className='px-2'>
      <EditorToolsHeader />
      <WrapperDropDown secctionName={"Display"}>
        <Display configTemplate={configTemplate} handleChange={handleChange} />
      </WrapperDropDown>
      <WrapperDropDown secctionName={"Size"}>
        <Width configTemplate={configTemplate} handleChange={handleChange} configRef={stylesString} />
        <Height configTemplate={configTemplate} handleChange={handleChange} configRef={stylesString} />
      </WrapperDropDown>
      <WrapperDropDown secctionName={"Spacing"}>
        <Padding configTemplate={configTemplate} handleChange={handleChange} configRef={stylesString} />
        <Margin configTemplate={configTemplate} handleChange={handleChange} configRef={stylesString} />
      </WrapperDropDown>
      <BorderRadius configTemplate={configTemplate} handleChange={handleChange} configRef={stylesString} />
      <BackgroundColor configTemplate={configTemplate} handleChange={handleChange} />
    </div>
  )
}

export default EditorTools