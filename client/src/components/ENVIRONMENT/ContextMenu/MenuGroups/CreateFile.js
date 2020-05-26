import React from 'react'
import axios from 'axios'

export default function CreateFile(props) {
  const [desktopApps, setDesktopApp] = props.desktopApps
  
  const createApp = async (app) => {
    const id = desktopApps.length ? desktopApps[desktopApps.length - 1].id + 1 : 1
    let data = {
      icon: 'https://maxindows.space/icons/Txt_icon.png',
      app: app,
      name: 'Text file'
    }
    
    await axios.post('/api/app/create', data)
    .then(res => {
      data = res.data
      setDesktopApp([...desktopApps, {...data, id: id}])
    })
    await axios.post('api/appdata/create', { id: data._id })
  }

  return (
    <>
      <li className="list__item">
        <div className="list__item__container">
          <span>Create<span className="arrow">></span></span>
          <ul className="menu__list_s list__submenu">
            <li className="list__item" onMouseDown={() => createApp('Text editor')}>
              <div className="list__item__container">
                <span>Text File</span>
              </div>
            </li>
            {/* <li className="list__item">
              <div className="list__item__container">
                <span>Link</span>
              </div>
            </li> */}
          </ul>
        </div>
      </li>
    </>
  )
}
