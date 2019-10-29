import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import actions from '../../store/actions/actions';
import Header from '../Header';
import { Link } from 'react-router-dom'

export const SingleUser = ({ getUser, id, user, loading, blogs }) => {
    const blogList = blogs.filter(b => b.user.id === id)

    useEffect(() => {
        getUser()
    }, [getUser])

    let sUser = <>loading...</>
    if (!loading) {
        sUser = <>
            <Header text={user.username} />

            <h2>added blogs</h2>

            <ul className="blog-list">
                {blogList.map(b =>
                    <li
                        key={b.id}
                        className="blog-list__item"
                    >
                        <Link className="blog-list__item--link" to={`/blogs/${b.id}`}>
                            {b.title}
                        </Link>
                    </li>
                )}
            </ul>
        </>
    }

    return (
        <div>
            {sUser}
        </div>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUser: () => dispatch(actions.getUser(ownProps.id))

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.singleUser,
        blogs: state.blog.blogs,
        loading: state.users.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)