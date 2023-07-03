import Blog from '../components/Blog'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe("<Blog/>", () => {
    //Ex 5.13
    test("Blog Rendering Title and Author without rendering username or likes.", () => {
        const blog = {title: "New Blog", author: "New Author", user:{name:"urwah"}}

        const mockHandler = jest.fn()

        const {container} = render(<Blog blog={blog} likeBlog={mockHandler} deleteBlog={mockHandler}/>)

        const title = screen.findAllByText("New Blog")
        const author = screen.findAllByText("New Author")
        const hidden = container.querySelector('.hidden')//div containing URL and Likes

        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(getComputedStyle(hidden).display).toBe('none')
    })

    //Ex 5.14
    test("Blog's URL and Likes being shown after clicking toggle", async () => {
        const blog = {title: "New Blog", author: "New Author", url: "/asdfhsdg",likes: 10, user:{name:"urwah"}}
        
        const mockHandler = jest.fn()
        const { container } = render(<Blog blog={blog} likeBlog={mockHandler} deleteBlog={mockHandler}/>)
        
        const hidden = container.querySelector('.hidden')//div containing URL and Likes
        expect(getComputedStyle(hidden).display).toBe('none')//Before Toggle

        const toggle = screen.getByText("Show")
        const user = userEvent.setup()
        await user.click(toggle)

        expect(getComputedStyle(hidden).display).toBe('block')//After Toggle
    })

    //Ex 5.15
    test("Liking Twice calls the Mock Twice", async () => {
        const blog = {title: "New Blog", author: "New Author", url: "/asdfhsdg",likes: 10, user:{name:"urwah"}}
        
        const mockHandler = jest.fn()
        render(<Blog blog={blog} likeBlog={mockHandler} deleteBlog={mockHandler}/>)

        const likeButton = screen.getByText("Like")
        const user = userEvent.setup()
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

