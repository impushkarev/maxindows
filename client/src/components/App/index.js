import React, {useState, useEffect} from 'react'
import TaskBar from 'components/TaskBar'
import Desktop from 'components/Desktop'
import axios from 'axios'

import './style.scss'

export default function App() {
  const [applications, setApplication] = useState([])
  const [activeApplication, setActiveApplication] = useState(0)
  const [desktopApps, setDesktopApp] = useState([])

  useEffect(() => {
    //GET DATA
    axios.get('/api/app').then(res => {
      const data = res.data
      const apps = data.apps

      apps.map((app, i) => {
        app.id = i + 1
        return app
      })

      setDesktopApp([...desktopApps, ...apps])
    })
  }, [])

  return (
    <React.Fragment>
      <Desktop  applications={[applications, setApplication]}
                activeApplication={[activeApplication, setActiveApplication]}
                desktopApps={desktopApps}
      />
      <TaskBar  applications={applications}
                activeApplication={[activeApplication, setActiveApplication]} 
      />
    </React.Fragment>
  )
}
