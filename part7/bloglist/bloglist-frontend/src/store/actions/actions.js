import { setNotification } from './notificationActions';
import { auth, authLogout, authCheckout } from './authActions';
import { getAll, createNewBlog, remove, addLike } from './blogActions';

export default {
    setNotification,
    auth,
    authLogout,
    authCheckout,
    getAll,
    createNewBlog,
    remove,
    addLike

}