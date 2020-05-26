import React, {useState} from 'react'
import Window from './Window'
import Shortcut from './Shortcuts/Shortcut'

import './style.scss'

export default function Desktop(props) {
  const applications = props.applications
  const activeApplication = props.activeApplication
  const desktopApps = props.desktopApps
  const [activeDesktopApp, setActiveDesktopApp] = useState(0)

  return (
    <section  className="desktop">
      <div className="desktop__apps">
        {
          desktopApps.map((app) => {
              const style = {top: (app.id - 1) % 6 * 90, left: Math.floor((app.id - 1) / 6) * 90}
              return <Shortcut  app={app} 
                                key={app.id}
                                style={style}
                                openApp={props.openApp}
                                activateApp={props.activateApp}
                                active={[activeDesktopApp === app.id, setActiveDesktopApp]} />
            }
          )
        }
      </div>
      {
        applications.map((app) => {
            return <Window  app={app}
                            key={app.id}
                            closeApp={props.closeApp}
                            hideApp={props.hideApp}
                            activateApp={props.activateApp}
                            active={activeApplication === app.id} />
          }
        )
      }
    </section>
  )
}
