import { createContext, useRef, useState } from "react";

export const BreackPointContext = createContext({
  breackPoint: null,
  setBreackPoint: () => { },
  handleBreackPoint: () => { },
  builderZoneRef: null
})

export function BreackPointProvider({ children }) {
  const [breackPoint, setBreackPoint] = useState("mobile")
  const builderZoneRef = useRef(null)

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

  return (
    <BreackPointContext.Provider
      value={{ handleBreackPoint, breackPoint, builderZoneRef }}>
      {children}
    </BreackPointContext.Provider>
  )
}