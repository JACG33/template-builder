import { useContext } from "react";
import { BreackPointContext } from "../context/BreackPointProvider";

export const useBraeackPointProvider = () => useContext(BreackPointContext)