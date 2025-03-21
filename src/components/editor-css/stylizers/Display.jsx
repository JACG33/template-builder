import { useState } from "react"

const Display = ({ handleChange, configTemplate }) => {
  const [selectType, setSelectType] = useState("")

  const selectHandleChange = (e) => {
    handleChange(e)
    if (e.target.name == "display")
      setSelectType(e.target.value)
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <span>Display</span>
        <select name="display" id="" onChange={selectHandleChange} value={configTemplate?.display ? configTemplate.display : ""} className="border border-gray-100 text-gray-100 bg-gray-700 p-2 rounded-lg cursor-pointer">
          <option value="">Select Display</option>
          <option value="none">None</option>
          <option value="block">Block</option>
          <option value="flex">Flex</option>
          <option value="grid">Grid</option>
        </select>
      </div>
      {(selectType == "flex" || selectType == "grid") &&
        <div className='grid grid-cols-2'>
          <label htmlFor="fdire">Flex Direction</label>
          <select 
            name="flexDirection" 
            id="fdire" 
            onChange={selectHandleChange} v
            alue={configTemplate?.flexDirection ? configTemplate.flexDirection : ""} 
            className="text-gray-700 p-2 rounded-lg cursor-pointer">
            <option value=""></option>
            <option value="row">Row</option>
            <option value="row-reverse">Row-reverse</option>
            <option value="column">Column</option>
            <option value="column-reverse">Column-reverse</option>
          </select>
        </div>
      }
      {(selectType == "flex" || selectType == "grid") &&
        <div className='grid grid-cols-2'>
          <label htmlFor="juCo">Justify Content</label>
          <select 
            name="justifyContent" 
            id="juCo" 
            onChange={selectHandleChange} 
            value={configTemplate?.justifyContent ? configTemplate.justifyContent : ""}
            className="text-gray-700 p-2 rounded-lg cursor-pointer">
            <option value=""></option>
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
            <option value="space-evenly">Space-evenly</option>
            <option value="space-around">Space-around</option>
            <option value="space-between">Space-between</option>
          </select>
        </div>
      }
      {(selectType == "flex" || selectType == "grid") &&
        <div className='grid grid-cols-2'>
          <label htmlFor="AlI">Align Items</label>
          <select 
            name="alignItems" 
            id="AlI" 
            onChange={selectHandleChange} 
            value={configTemplate?.alignItems ? configTemplate.alignItems : ""}
            className="text-gray-700 p-2 rounded-lg cursor-pointer">
            <option value=""></option>
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
          </select>
        </div>
      }
      {(selectType == "flex" || selectType == "grid") &&
        <div className='grid grid-cols-2'>
          <label htmlFor="spc">Spacing</label>
          <input 
            type="number" 
            name="gap" 
            id="spc" min={0} max={10000} 
            onChange={handleChange} 
            value={configTemplate?.gap ? configTemplate.gap : 0} 
            className="text-gray-700 p-2 rounded-lg" />
        </div>
      }
    </>
  )
}

export default Display