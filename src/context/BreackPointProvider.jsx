import { createContext, useRef, useState } from "react";

export const BreackPointContext = createContext({
  breackPoint: String,
  setBreackPoint: () => { },
  handleBreackPoint: () => { },
  builderZoneRef: null,
  bkpoint: Object,
  previewMode: null,
  handlePreviewMode:()=>{},
})

export function BreackPointProvider({ children }) {
  const [breackPoint, setBreackPoint] = useState("mobile")
  const [previewMode,setPreviewMode]=useState(false)
  const builderZoneRef = useRef(null)
  const bkpoint = {
    "": "",
    "mobile": "builder__zone--mobile",
    "mobilex2": "builder__zone--mobile2",
    "tablet": "builder__zone--tablet",
    "desktop": "builder__zone--desktop",
    "desktopx2": "builder__zone--desktopx2",
    "desktopx3": "builder__zone--desktopx3",
  }

  /**
   * Funcion para resetear el width del BuilderZone cuando se cambia el tipo de BrackPoint
   */
  const reseteSizeBuilderZone = () => {
    builderZoneRef.current.querySelector(".builder__zone").style.width = null
  }

  const handleBreackPoint = (bkpoint) => {
    reseteSizeBuilderZone()
    setBreackPoint(bkpoint)
  }

  const handlePreviewMode=()=>setPreviewMode(!previewMode)

  return (
    <BreackPointContext.Provider
      value={{ handleBreackPoint, breackPoint, builderZoneRef, bkpoint,previewMode,handlePreviewMode }}>
      {children}
    </BreackPointContext.Provider>
  )
}