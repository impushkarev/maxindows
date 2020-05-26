import React, {useState, useEffect} from 'react'

import OpenFile from './MenuGroups/OpenFile'
import FileActions from './MenuGroups/FileActions'
import CreateFile from './MenuGroups/CreateFile'

import './style.scss'

export default function ContextMenu(props) {
  const [isFile, setIsFile] = useState({is: false})
  const [desktopApps, setDesktopApp] = props.desktopApps
  const [style, setStyle] = useState({top: 0, left: 0})
  const [contextMenu, setContextMenu] = useState(false)

  useEffect(() => {
    const rClick = (e) => {
      e.preventDefault()
      setContextMenu(true)
      setStyle({...style, top: e.clientY, left: e.clientX})

      e.target.closest('.shortcut') !== null ? 
        setIsFile({is: true, file: e.target.closest('.shortcut')}) : 
        setIsFile(false)
    }
    document.addEventListener('contextmenu', (e) => rClick(e))

    // console.log([<OpenFile />, <CreateFile />, <FileActions />])
  }, [])
  useEffect(() => {
    if (contextMenu) {
      document.addEventListener('mousedown', (e) => {
        setContextMenu(false)
      })
    }
  })

  return contextMenu ? (
    <section className={`contextMenu`} style={style}>
      <ul className="menu__list_s">
        { isFile.is ? 
          <>
            <OpenFile openApp={[props.openApp, isFile.file.id]} />
            <hr />
          </>
        : null }

        <CreateFile desktopApps={[desktopApps, setDesktopApp]} />
        
        { isFile.is ? 
          <>      
            <hr />
            <FileActions  isFile={isFile}
                          desktopApps={[desktopApps, setDesktopApp]} /> 
          </>
        : null }
      </ul>
    </section>
  ) : null
}
