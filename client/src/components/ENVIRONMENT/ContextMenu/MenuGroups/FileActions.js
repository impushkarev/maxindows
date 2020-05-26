import React from 'react'
import axios from 'axios'

export default function FileActions(props) {
  const isFile = props.isFile
  const [desktopApps, setDesktopApp] = props.desktopApps

  const deleteApp = async (el) => {
    const id = isFile.file.id

    await axios.delete(`/api/app/delete/${id}`)
    .then(res => {
      const data = res.data
      setDesktopApp(desktopApps.filter(app => {if (app._id !== id) return app}))
    })
    await axios.delete(`/api/appdata/delete/${id}`)
  }
  const renameApp = (el) => {
    console.log(isFile.file.id)
  }

  return (
    <>
      <li className="list__item" onMouseDown={(e) => deleteApp(e)}>
        <div className="list__item__container">
          <span>Delete</span>
        </div>
      </li>
      {/* <li className="list__item" onMouseDown={(e) => renameApp(e)}>
        <div className="list__item__container">
          <span>Rename</span>
        </div>
      </li> */}
    </>
  )
}
