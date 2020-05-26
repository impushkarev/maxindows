import React from 'react'

export default function ShortcutThumb(props) {
  const app = props.app

  return (
    <div  className="shortcut__image" 
          onDoubleClick={() => props.openApp(app._id)}>
      <img src={app.icon} alt={app.name} />
    </div>
  )
}
