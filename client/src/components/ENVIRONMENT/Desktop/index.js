import React, {useState} from 'react'
import Window from './Window'
import Shortcut from './Shortcuts/Shortcut'

import './style.scss'

export default function Desktop(props) {
  const [applications, setApplication] = props.applications
  const [activeApplication, setActiveApplication] = props.activeApplication
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
                                application={[applications, setApplication]}
                                activeDesktopApp={[activeDesktopApp, setActiveDesktopApp]}
                                setActiveApplication={setActiveApplication} />
            }
          )
        }
      </div>
      {
        applications.map((app) => {
            return <Window app={app}
                    key={app.id}
                    active={activeApplication === app.id ? true : false}
                    application={[applications, setApplication]}
                    setActiveApplication={setActiveApplication} />
          }
        )
      }
    </section>
  )
}
