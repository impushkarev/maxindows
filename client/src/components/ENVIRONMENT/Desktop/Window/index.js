import React, {useState} from 'react'
import Application from './Application'

import './style.scss'

export default function Window(props) {
  const app = props.app
  const [appStatus, setAppStatus] = useState('')
  const active = props.active
  const setActiveApplication = props.setActiveApplication
  const [applications, setApplication] = props.application
  const [windowStyle, setWindowStyle] = useState({top: 0, left: 0, opacity: 1, cursor: 'wait'})

  const activateApp = (id) => {
    setActiveApplication(id)
  }
  const moveApp = (e) => {
    if (e.button !== 2) {
      const [sX, sY] = [e.clientX, e.clientY]
      setWindowStyle({...windowStyle, opacity: .8})
      const mouseUp = (e) => {
        const [eX, eY] = [e.clientX, e.clientY]
        const [vX, vY] = [eX - sX, eY - sY]
        const [oT, oL] = [windowStyle['top'], windowStyle['left']]
        setWindowStyle({...windowStyle, top: oT + vY, left: oL + vX, opacity: 1})
        document.removeEventListener('mouseup', mouseUp)
      }
      document.addEventListener('mouseup', mouseUp)
    }
  }
  const closeApp = (id) => {
    setActiveApplication(0)
    setApplication(applications.filter((app) => {
      return app.id !== id
    }))
  }
  const hideApp = (id) => {
    setActiveApplication(0)
    setApplication(applications.map((app) => {
      if (app.id === id)
        app.hidden = true
      return app
    }))
  }

  return (
    <section  className={`window ${active ? 'active' : ''} ${app.hidden ? 'hide' : ''}`}  
              style={windowStyle}
              onMouseDown={() => {activateApp(app.id)}}>
      <div  className="window__header"
            onMouseDown={(e) => {moveApp(e)}} >
        <div className="container">
          <div className="window__icon">
            <img src={app.icon} alt={app.name} />
          </div>
          <p className="window__title">{`${app.name} ${appStatus}`}</p>
          <div className="window__actions">
            <div  className="window__hide button"
                  onClick={() => {hideApp(app.id)}}>
              _
            </div>
            <div  className="window__close button"
                  onClick={() => {closeApp(app.id)}}>
              x
            </div>
          </div>
        </div>
      </div>
      <div className="window__body">
        <Application  app={app} 
                      appStatus={setAppStatus}
                      closeApp={closeApp} 
                      style={[windowStyle, setWindowStyle]} />
      </div>
    </section>
  )
}
