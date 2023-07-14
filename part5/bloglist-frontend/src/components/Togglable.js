import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ label, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible?'none':'' }
  const showWhenVisible = { display: visible?'':'none' }

  const toggleVisiblity = () => {
    setVisible(!visible)
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

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default Togglable