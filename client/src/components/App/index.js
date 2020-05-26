import React, {useState, useEffect} from 'react'
import axios from 'axios'

import TaskBar from 'components/ENVIRONMENT/TaskBar'
import Desktop from 'components/ENVIRONMENT/Desktop'
import ContextMenu from 'components/ENVIRONMENT/ContextMenu'

import './style.scss'

export default function App() {
  const [isMounted, setIsMounted] = useState(false)

  const [desktopApps, setDesktopApp] = useState([])
  const [applications, setApplication] = useState([])
  const [activeApplication, setActiveApplication] = useState(0)

  useEffect(() => {
    if (!isMounted) {
      getApps()
      setIsMounted(true)
    }
  }, [desktopApps])

  //GET DATA
  const getApps = () => {
    axios.get('/api/app')
    .then(res => {
      const data = res.data
      const apps = data.apps
      // ADD APP INDEX
      apps.map((app, i) => {
        app.id = i + 1
        return app
      })
      return apps
    })
    .then(setDesktopApp)
  }

  // APP (WINDOWS)
  //// ACTIVATE APP
  const activateApp = (app) => {
    setActiveApplication(app)
  }
  //// OPEN APP
  const openApp = (app) => {
    const id = applications.length ? applications[applications.length - 1].id + 1 : 1

    const fA = desktopApps.find(appl => appl._id === app ? appl : null)
    setApplication([...applications, {...fA, id: id, hidden: false}])
    setActiveApplication(id)
  }
  //// CLOSE APP
  const closeApp = (id) => {
    setActiveApplication(0)
    setApplication(applications.filter((app) => {
      return app.id !== id
    }))
  }
  //// HIDE APP
  const hideApp = (id) => {
    setActiveApplication(0)
    setApplication(applications.map((app) => {
      if (app.id === id)
        app.hidden = true
      return app
    }))
  }

  return (
    <React.Fragment>
      <Desktop  openApp={openApp}
                closeApp={closeApp}
                hideApp={hideApp}
                activateApp={activateApp}
                applications={applications}
                activeApplication={activeApplication}
                desktopApps={desktopApps} />
      <TaskBar  applications={applications}
                activeApplication={[activeApplication, setActiveApplication]} />
      <ContextMenu  openApp={openApp}
                    desktopApps={[desktopApps, setDesktopApp]} />
    </React.Fragment>
  )
}
