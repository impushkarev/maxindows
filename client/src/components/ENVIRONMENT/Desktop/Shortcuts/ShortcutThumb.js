import React from 'react'

export default function ShortcutThumb(props) {
  const app = props.app
  const setActiveApplication = props.setActiveApplication
  const [applications, setApplication] = props.applications

  const openApp = (app) => {
    const id = applications.length ? applications[applications.length - 1].id + 1 : 1
    setApplication([...applications, {...app, id: id, hidden: false}])
    setActiveApplication(id)
  }

  return (
    <div  className="shortcut__image" 
          onDoubleClick={() => openApp(app)}>
      <img src={app.icon} alt={app.name} />
    </div>
  )
}
