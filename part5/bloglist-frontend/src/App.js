import React, { useState, useEffect} from 'react';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs/Blogs'
import { setToken } from './services/blogs';
import Notification from './components/Notification/Notification';


function App() {
  const [user, setUser] = useState(null);
  
  const [notificationMessage, setNotificationMessage] = useState({
    type: null,
    message: ''
  })
 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    } else {
      setUser(null)
      setToken(null);
    }
  }, [])



  return (
    <div className="App">
      {notificationMessage.type === null ? null
        : <Notification
          type={notificationMessage.type}
          message={notificationMessage.message}
          setter={setNotificationMessage}
        />
      }
      {user ?
        <Blogs
          user={user.name}
          setUser={setUser}
          notificationSetter={setNotificationMessage}
        />
        : <LoginForm
          notificationSetter={setNotificationMessage}
          setUser={setUser} />}

    </div>
  );
}

export default App;
