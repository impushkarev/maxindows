import React, {useState} from 'react'

import './style.scss'

export default function Shortcuts(props) {
  const app = props.app
  const style = props.style
  const setActiveApplication = props.setActiveApplication
  const [shortcutStyle, setShortcutStyle] = useState({top: style.top, left: style.left, opacity: 1})
  const [applications, setApplication] = props.application
  const [activeDesktopApp, setActiveDesktopApp] = props.activeDesktopApp

  const moveShortcut = (e) => {
    ondragstart = () => {return false}
    const [sX, sY] = [e.clientX, e.clientY]
    setShortcutStyle({...shortcutStyle, opacity: .8})
    const mouseUp = (e) => {
      const [eX, eY] = [e.clientX, e.clientY]
      const [vX, vY] = [eX - sX, eY - sY]
      const [oT, oL] = [shortcutStyle['top'], shortcutStyle['left']]
      setShortcutStyle({...shortcutStyle, top: oT + vY, left: oL + vX, opacity: 1})
      document.removeEventListener('mouseup', mouseUp)
    }
    document.addEventListener('mouseup', mouseUp)
  }
  const openApp = (app) => {
    const id = applications.length ? applications[applications.length - 1].id + 1 : 1
    setApplication([...applications, {...app, id: id, hidden: false}])
    setActiveApplication(id)
  }

  return (
    <div  className={`shortcut ${activeDesktopApp === app.id ? 'active' : ''}`}
          onMouseDown={(e) => {moveShortcut(e)
                              setActiveDesktopApp(app.id)}}
          onDoubleClick={() => openApp(app)}
          style={shortcutStyle}>
      <div className="shortcut__image">
        <img src={app.icon} alt={app.name} />
      </div>
      <div className="shortcut__title">
        {app.name}
      </div>
    </div>
  )
}
