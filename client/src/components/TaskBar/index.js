import React, {useState, useEffect} from 'react'

import './style.scss'

export default function TaskBar(props) {
  const applications = props.applications
  const [activeApplication, setActiveApplication] = props.activeApplication
  const [time, setTime] = useState('0:0:0')
  
  useEffect(() => {
    const timeTimer = setInterval(() => {
      const date = new Date()
      setTime(date.toLocaleTimeString())
    }, 1000)

    return function cleanup() {
      clearInterval(timeTimer)
    }
  }, [time])
  const setActive = (id) => {
    setActiveApplication(id)
    applications.map((app) => {
      if (app.id === id)
        app.hidden = false
      return app
    })
  }

  return (
    <section className="taskbar">
      <div className="container">
        <nav className="nav">
          {
            applications.map((app) => 
              <div  className={`nav__app ${activeApplication === app.id ? 'active' : ''}`} 
                    key={app.id}
                    onClick={() => setActive(app.id)}>
                <div className="app__icon">
                  <img src={app.icon} alt={app.name} />
                </div>
                <div className="app__title">
                  {app.name}
                </div>
              </div>
            )
          }
        </nav>
        <div className="time">
          {time}
        </div>
      </div>
    </section>
  )
}
