import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import './Notification.css';

const Notification = ({ message, type, show }) => {
    let className = ['announce']

    let notification = null;




    if (type === 'error') {
        className.push('error')
    }
    if (type === 'notification') {
        className.push('notification');
    }
    if (type === null) {
        return null
    }

    if (show) {
        notification = <div className={className.join(' ')}>
            {message}
        </div>

    }
    return (
        notification
    )
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
    return {
        message: state.notif.message,
        type: state.notif.type,
        show: state.notif.show
    }
}

export default connect(mapStateToProps)(Notification);

