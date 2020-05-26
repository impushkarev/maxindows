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

  return (
    <React.Fragment>
      <Desktop  applications={[applications, setApplication]}
                activeApplication={[activeApplication, setActiveApplication]}
                desktopApps={desktopApps} />
      <TaskBar  applications={applications}
                activeApplication={[activeApplication, setActiveApplication]} />
      <ContextMenu  desktopApps={[desktopApps, setDesktopApp]} />
    </React.Fragment>
  )
}
