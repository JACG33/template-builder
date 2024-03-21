import { useContext } from "react";
import { EditorContext } from "../context/EditorProvider";

export const useEditorProvider = () => useContext(EditorContext);
