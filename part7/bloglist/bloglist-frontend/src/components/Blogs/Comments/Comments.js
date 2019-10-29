import React from 'react'
import SingleComment from './SingleComment'

export const Comments = ({ comments }) => {


    let content = <div>No comments here, you can be first</div>

    if (comments.length > 0) {
        content = comments.map(c => <SingleComment data={c} key={c.id} />)

    }

    return (
        <div>
            {content}
        </div>
    )
}



export default Comments 