import { useState } from 'react'

const useDragAndDrop = ({ dragginElement }={}) => {
  const [itemsToTemplate, setitemsToTemplate] = useState([])
  const [dragEnter, setdragEnter] = useState("")
  const [counterComponents, setCounterComponents] = useState(0)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setdragEnter("border-blue-500")
  }
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let Com = dragginElement?.dataset?.component
    let count = counterComponents
    count++
    import("../components/templatesui/").then(res => setitemsToTemplate([...itemsToTemplate, { id: count, component: res[Com] }]))
    setCounterComponents(count)
    setdragEnter("")
  }

  const handleOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setdragEnter("")
  }


  const handleDeleteComponent = (id) => {
    const deleteFile = itemsToTemplate.filter((ele) => ele.id !== id);
    console.log(id);
    console.log(itemsToTemplate);
    /* setitemsToTemplate({
      ...deleteFile
    }); */
  }

  return { dragEnter, itemsToTemplate, handleDragEnter, handleDrop, handleLeave, handleOver,handleDeleteComponent }
}

export default useDragAndDrop