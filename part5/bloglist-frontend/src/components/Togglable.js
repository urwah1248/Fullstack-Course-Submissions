import React, { useState } from 'react'

const Togglable = ({label, children}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible?"none":""}
    const showWhenVisible = {display: visible?"":"none"}

    const toggleVisiblity = () => {
        setVisible(!visible);
    }
  return (
    <div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisiblity}>{label}</button>
        </div>
        <div style={showWhenVisible}>
            {children}
            <button onClick={toggleVisiblity}>Cancel</button>
        </div>
    </div>
  )
}

export default Togglable