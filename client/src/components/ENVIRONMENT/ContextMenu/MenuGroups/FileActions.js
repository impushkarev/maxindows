import React from 'react'
import axios from 'axios'

export default function FileActions(props) {
  const isFile = props.isFile
  const [desktopApps, setDesktopApp] = props.desktopApps

  const deleteApp = async (el) => {
    const id = isFile.file.id

    // DEL APP
    await axios.delete(`/api/app/delete/${id}`)
    .then(
      setDesktopApp(desktopApps.filter(app => { return app._id !== id ? app : null }))
    )
    // DEL APP DATA
    await axios.delete(`/api/appdata/delete/${id}`)
  }
  // const renameApp = (el) => {
  //   console.log(isFile.file.id)
  // }

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
