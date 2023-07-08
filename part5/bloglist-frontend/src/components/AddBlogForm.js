import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddBlogForm = ({setBlogMessage, setBlogs, blogs}) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({title, author, url});
        blogService.addBlog({title, author, url})
        setBlogs([...blogs, {title, author, url}])
        setBlogMessage({title, author, url})

        setTitle('');
        setAuthor('');
        setUrl('');
    }

    return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:
            <input type="text" name="content" id="content" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </label>
        <br />
        <label htmlFor="author">Author:
            <input type="text" name="author" id="author" value={author} onChange={(e)=> setAuthor(e.target.value)} required />
        </label>
        <br />
        <label htmlFor="url">URL:
            <input type="text" name="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)} required/>
        </label>
        <br />
        <button type="submit">Create Blog</button>
    </form>
    )
}

export default AddBlogForm