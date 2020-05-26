import React from 'react'

export default function OpenFile(props) {
  const [openApp, idApp] = props.openApp
  return (
    <li className="list__item" onMouseDown={(e) => {openApp(idApp)}}>
      <div className="list__item__container">
        <span><b>Open</b></span>
      </div>
    </li>
  )
}
