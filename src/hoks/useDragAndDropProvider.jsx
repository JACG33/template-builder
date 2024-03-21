import { useContext } from "react";
import { DragAndDropContext } from "../context/DragDropProvider";

export const useDragAndDropProvider = () => useContext(DragAndDropContext);
