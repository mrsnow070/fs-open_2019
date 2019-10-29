import React from 'react'
import { Link } from 'react-router-dom';

export const SingleComment = ({ data }) => {

    const date = new Date(data.date)

    return (
        <div className="comment">
            <div className="comment__header">
                <div className="comment__header-user">
                    <Link to={`/users/${data.user.userId}`}>{data.user.username}</Link>
                </div>
                <div className="comment__header-date">
                    {`${date.toLocaleDateString()}`}
                    <span className="comment__header-date--time">{date.toLocaleTimeString()}</span>
                </div>
            </div>
            <div className="comment__body">
                {data.comment}
            </div>

        </div>
    )
}

export default SingleComment