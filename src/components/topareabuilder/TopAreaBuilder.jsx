import { useState } from "react"
import { useEditorProvider } from "../../hoks/useEditorProvider"
import { ChevronCompactUpIcon } from "../svg"

const TopAreaBuilder = () => {
  const { breackPoint, handleBreackPoint } = useEditorProvider()
  const [hiddenSecction, setHiddenSecction] = useState(false)

  const hdlToggle = () => {
    setHiddenSecction(!hiddenSecction)
  }

  return (
    <div className={`absolute z-10 w-fit inset-[5px_10px_auto_10px] m-auto p-2 rounded-lg bg-gray-600 transition-all duration-300 shadow-lg ${hiddenSecction ? "" : "translate-y-[-45px]"}`}>
      <select name="breackPoint" id="" className="bg-gray-600 text-gray-100 cursor-pointer" onChange={e => handleBreackPoint(e.target.value)} value={breackPoint}>
        {/* <option value="">Select BreackPoint</option> */}
        <option value="mobile">Mobile : 320px &lt;= width &gt;= 479px</option>
        <option value="mobilex2">Mobile : 480px &lt;= width &gt;= 767px</option>
        <option value="tablet">Tablet : 768px &lt;= width &gt;= 991px</option>
        <option value="desktop">Descktop : width &gt;= 1024px</option>
        <option value="desktopx2">DescktopX2 :  width &gt;= 1280px</option>
        <option value="desktopx3">DescktopX3 :  width &gt;= 1440px</option>
      </select>
      <div className="relative flex justify-center items-center">
        <button className="w-8 h-6 absolute rounded-bl-full rounded-br-full bg-gray-600 top-0 hover:top-1 flex justify-center items-center text-white transition-all duration-300 cursor-pointer" type="button" onClick={hdlToggle}> 
          <ChevronCompactUpIcon  className={`transition-all duration-300 ${hiddenSecction ? "" : "rotate-180"}`} />
        </button>
      </div>
    </div>
  )
}

export default TopAreaBuilder