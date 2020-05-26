import React, {useState} from 'react'

import ShortcutThumb from './ShortcutThumb'
import ShortcutTitle from './ShortcutTitle'

import './style.scss'

export default function Shortcut(props) {
  const app = props.app
  const style = props.style
  const [active, setActiveDesktopApp] = props.active
  const [shortcutStyle, setShortcutStyle] = useState({top: style.top, left: style.left, opacity: 1})

  const moveShortcut = (e) => {
    if (e.button !== 2) {
      ondragstart = () => {return false}
      const [sX, sY] = [e.clientX, e.clientY]
      setShortcutStyle({...shortcutStyle, opacity: .8})
      const mouseUp = (e) => {
        const [eX, eY] = [e.clientX, e.clientY]
        const [vX, vY] = [eX - sX, eY - sY]
        const [oT, oL] = [shortcutStyle['top'], shortcutStyle['left']]
        setShortcutStyle({...shortcutStyle, top: oT + vY, left: oL + vX, opacity: 1})
        document.removeEventListener('mouseup', mouseUp)
      }
      document.addEventListener('mouseup', mouseUp)
    }
  }

  return (
    <div  className={`shortcut ${active ? 'active' : ''}`}
          onMouseDown={(e) => { moveShortcut(e)
                                setActiveDesktopApp(app.id)}}
          style={shortcutStyle}
          id={app._id} >
      <ShortcutThumb  app={app}
                      openApp={props.openApp} />
      <ShortcutTitle  app={app} />
    </div>
  )
}
