import React, { useState, useEffect } from 'react';

const BlogNotification = ({blog}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setVisible(false);
        }, 3000); // 3000 milliseconds = 3 seconds

        return () => clearTimeout(timer); // Clear the timer when the component unmounts
    }, []);

    if(blog&&visible){
        return (
            <div style={{border: "2px solid green", borderRadius:"5px", padding:5, color:"green"}}>
                New Blog Added "{blog.title}" by "{blog.author}"
            </div>
        )   
    }
}

export default BlogNotification