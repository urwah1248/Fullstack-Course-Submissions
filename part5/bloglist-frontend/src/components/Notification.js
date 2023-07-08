import React, { useEffect, useState } from "react";

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // 3000 milliseconds = 3 seconds

      return () => clearTimeout(timer); // Clear the timer when the component unmounts or when the message changes
    }
  }, [message]);

  if (message && visible) {
    return (
      <div className="error" style={{border: "2px solid red", borderRadius:"5px", padding:5, color:"red", marginBottom:10}}>
        {message}
      </div>
    );
  }

  return null;
};

export default Notification;
