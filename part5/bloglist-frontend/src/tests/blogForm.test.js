import AddBlogForm from '../components/AddBlogForm'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe("<BlogForm/>", () => {
    //Ex 5.16
    test("Checking Form submit", async () => {
        const mockHandler = jest.fn()
        const {container} = render(<AddBlogForm addBlog={mockHandler}/>)

        const user = userEvent.setup()
        const titleInput = container.querySelector("#content")
        const authorInput = container.querySelector("#author")
        const urlInput = container.querySelector("#url")
        const submit = screen.getByText("Create Blog")

        await user.type(titleInput, "Example Title")
        expect(titleInput.value).toBe("Example Title")

        await user.type(authorInput, "Example Author")
        expect(authorInput.value).toBe("Example Author")

        await user.type(urlInput, "www.example.com")
        expect(urlInput.value).toBe("www.example.com")

        await user.click(submit)

        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})

