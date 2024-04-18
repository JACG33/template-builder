import { useState } from "react";
import { createContext } from "react";

export const BreackPointContext = createContext({
  breackPoint: null,
  setBreackPoint: () => { },
  handleBreackPoint: () => { }
})

export function BreackPointProvider({ children }) {
  const [breackPoint, setBreackPoint] = useState("1024px")

  const handleBreackPoint = (bkpoint) => setBreackPoint(bkpoint)

  return (
    <BreackPointContext.Provider
      value={{ handleBreackPoint, breackPoint }}>
      {children}
    </BreackPointContext.Provider>
  )
}