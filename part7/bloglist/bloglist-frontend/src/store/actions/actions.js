import { setNotification } from './notificationActions';
import { auth, authLogout, authCheckout } from './authActions';
import { getAll, createNewBlog, remove, addLike, addComment } from './blogActions';
import { getAllUsers, getUser } from './usersActions';

export default {
    setNotification,
    auth,
    authLogout,
    authCheckout,
    getAll,
    createNewBlog,
    remove,
    addLike,
    getAllUsers,
    getUser,
    addComment

}