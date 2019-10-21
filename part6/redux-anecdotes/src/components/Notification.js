import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notif }) => {
  console.log(notif.show)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  let notification = null;
  if (notif.show) {
    notification = <div style={style}>
      {notif.message}
    </div>
  }

  return (
    notification
  )
}

const mapStateToProps = (state) => {
  return {
    notif: state.notification
  }
}

export default connect(mapStateToProps)(Notification)