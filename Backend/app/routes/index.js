// Importing the campgroundRouter from the 'campground-route.js' file
import campgroundRouter from './campground-route.js';
import adminRouter from './admin-route.js';
import registerRouter from './register-route.js';
import loginRouter from './login-route.js';
import logoutRouter from './logout-route.js'
import currUserRouter from './currUser-route.js'

// Exporting the admin route
export default (app) => {
    app.use('/admin', adminRouter)
}

// Exporting the campground route
export const campgroundRoute = (app) => {
    app.use('/campgrounds', campgroundRouter);
}

// Exporting the register route
export const registerRoute = (app) => {
    app.use('/register', registerRouter);
}    

// Exporting the login route
export const loginRoute = (app) => {
    app.use(`/login`, loginRouter )
}

// Exporting the logout route
export const logoutRoute = (app) => {
    app.use(`/logout`, logoutRouter )
}

// Exporting the current-user route
export const currUserRoute = (app) => {
    app.use(`/current-user`, currUserRouter )
}