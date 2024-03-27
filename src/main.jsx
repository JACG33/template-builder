import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { EditorProvider } from './context/EditorProvider.jsx'
import { DragAndDropProvider } from './context/DragDropProvider.jsx'
import { ExportImportProvider } from './context/ExportImportProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EditorProvider>
      <DragAndDropProvider>
        <ExportImportProvider>
          <App />
        </ExportImportProvider>
      </DragAndDropProvider>
    </EditorProvider>
  </React.StrictMode>,
)
