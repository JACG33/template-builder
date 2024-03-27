import { useContext } from "react";
import { ExportImportContext } from "../context/ExportImportProvider";

export const useExportImportProvider = () => useContext(ExportImportContext)