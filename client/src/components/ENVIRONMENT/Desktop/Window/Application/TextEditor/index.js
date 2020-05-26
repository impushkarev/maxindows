import React, {useState, useEffect} from 'react'
import axios from 'axios'

import './style.scss'

export default function TextEditor(props) {
  const [app, appData] = props.app
  const appStatus = props.appStatus
  const closeApp = props.closeApp
  const [valueTextarea, setValueTextarea] = useState(appData[0].value)
  const [valueTextareaBS, setValueTextareaBS] = useState(appData[0].value)

  const isEdit = valueTextareaBS !== valueTextarea

  useEffect(() => {
    setValueTextarea(appData[0].value)
    setValueTextareaBS(appData[0].value)
  }, [appData])
  useEffect(() => {
    isEdit ? appStatus('*') : appStatus('')
  }, [valueTextarea, valueTextareaBS, appStatus])

  const saveApp = () => {
    appStatus('')
    setValueTextareaBS(valueTextarea)
    axios.put(`/api/appdata/edit/${app._id}`, {value: valueTextarea})
  }
  const keyDown = (e) => {
    //SAVE FILE
    if (e.ctrlKey && e.which === 83) {
      e.preventDefault()

      return isEdit ? saveApp() : null
    }
  }

  return (
    <React.Fragment>
      <div className="body__menu">
        <ul className="menu__list">
          <li className="list__item">
            <span>File</span>
            <ul className="list__submenu">
              <li className="submenu__item" onClick={() => {saveApp(app.id)}}>Save</li>
              <hr />
              <li className="submenu__item" onClick={() => {closeApp(app.id)}}>Exit</li>
            </ul>
          </li>
          {/*<li className="list__item">
            <span>Help</span>
          </li>*/}
        </ul>
      </div>
      <textarea className="body__container texteditor"
                value={valueTextarea}
                onChange={(e) => setValueTextarea(e.target.value)}
                onKeyDown={(e) => keyDown(e)} />
    </React.Fragment>
  )
}
