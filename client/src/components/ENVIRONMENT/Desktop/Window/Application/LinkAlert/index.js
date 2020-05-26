import React from 'react'

import './style.scss'

export default function LinkAlert(props) {
  let [app, appData] = props.app
  const closeApp = props.closeApp

  const [link, warning] = [appData[0].value, appData[1].value]
  
  return (
    <React.Fragment>
      <div className="alert body_padding">
        <div className="alert__info">
          <div className="container">
            <div className="alert__img">
              <img src="https://maxindows.space/icons/Warning_icon.png" alt="warning" />
            </div>
            <div className="alert__text">
              <p>{warning}</p>
            </div>
          </div>
        </div>
        <div className="alert__buttons">
          <div className="container">
            <a href={link} onClick={() => closeApp(app.id)} target="_blank" rel="noopener noreferrer"><p className="button">YES</p></a>
            <a onClick={() => closeApp(app.id)}><p className="button">NO</p></a>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
