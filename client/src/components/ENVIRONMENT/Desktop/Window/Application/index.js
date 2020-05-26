import React, {useState, useEffect} from 'react'
import TextEditor from './TextEditor'
import LinkAlert from './LinkAlert'
import axios from 'axios'

export default function Application(props) {
  const app = props.app
  const [appData, setAppData] = useState([{}, {}])
  const [styleWindow, setStyleWindow] = props.style
  const closeApp = props.closeApp

  useEffect(() => {
    axios.get(`/api/appData/${app._id}`)
    .then(res => {
      const data = res.data
      const gappData = data.appData.data

      setStyleWindow({...styleWindow, cursor: 'inherit'})
      setAppData(gappData)
    })
  }, [])

  const showApp = (app) => {
    switch (app.app) {
      case 'Google Chrome':
        return app.name
      case 'Text editor':
        return <TextEditor  app={[app, appData]}
                            appStatus={props.appStatus}
                            closeApp={closeApp} />
      case 'Link':
        return <LinkAlert app={[app, appData]}
                          closeApp={closeApp} />
      default: 
        return 'App not found'
    }
  }

  return (
    <React.Fragment>
      {showApp(app)}
    </React.Fragment>
  )
}
