import React, {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import axios from 'axios'

export default function ShortcutTitle(props) {
  const app = props.app
  const [edit, setEdit] = useState(false)
  const [prevTitle, setPrevTitle] = useState(app.name)
  const [title, setTitle] = useState(app.name)

  const textInput = React.createRef()

  useEffect(() => {
    if (edit) {
      textInput.current.select()

      document.addEventListener('mousedown', unFocus)
    }
  }, [edit])

  const unFocus = async () => {
    setEdit(false)
    if (title !== prevTitle) {
      setPrevTitle(title)
      await axios.put(`/api/app/edit/${app._id}`, {name: title})
    }
    document.removeEventListener('mousedown', unFocus)
  }
  const startEdit = () => {
    if (!edit) {
      setEdit(true)
    }
  }
  const editting = (e) => {
    const el = e.target
    setTitle(el.value)
  }
  const hotKeys = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      unFocus()
    }
  }

  return !edit ? (
    <div 
    
    className="shortcut__title"
          onDoubleClick={() => startEdit()}>
      {title}
    </div>
  ) : (
    <TextareaAutosize className="shortcut__title editing" 
                      onKeyDown={hotKeys}
                      onChange={editting} 
                      value={title} 
                      ref={textInput}
                      autoFocus
                      maxLength={32}
                      rows={1} />
  )
}