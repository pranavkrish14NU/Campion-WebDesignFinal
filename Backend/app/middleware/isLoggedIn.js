
//Tried to check if user is logged in

const isLoggedIn = (request, response, next) => {
    if (!request.isAuthenticated()) {
        request.session.returnTo = request.originalUrl; 
        // req.flash('error', 'You must be signed in first!');
        return response.redirect('/login');
    }
    next();
}

export default isLoggedIn;