import React from 'react'
import SimpleBlog from './SimpleBlog';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'



test('component renders the title, author and amount of likes for the blog post', () => {
    const blog = {
        title: 'Testing library',
        author: 'Dmitry',
        url: 'localhost',
        likes: '15',
        user: '5da708506cbbe41bd4c65a79'
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    const title = component.container.querySelector('.blog__header-title')
    const author = component.container.querySelector('.blog__header-author')
    const likes = component.container.querySelector('.blog__likes-count')

    expect(title).toHaveTextContent('Testing library');
    expect(author).toHaveTextContent('Dmitry');
    expect(likes).toHaveTextContent('15');





})

test('like button of a component is pressed twice, the event handler function passed in the component\'s props is called twice.', () => {
    const blog = {
        title: 'Testing library',
        author: 'Dmitry',
        url: 'localhost',
        likes: '15',
        user: '5da708506cbbe41bd4c65a79'
    }

    const mockHandler = jest.fn()
    const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const button = component.container.querySelector('.blog__likes-button')

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2)

})

// test('only the name and author of the blog post are shown by default', () => {
//     const blog = {
//         title: 'Testing library',
//         author: 'Dmitry',
//         url: 'localhost',
//         likes: '15',
//         user: '5da708506cbbe41bd4c65a79'
//     }

//     const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
// })

