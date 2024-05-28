
const {getSessionIdUser} = require('../service/auth');

// const restrictToLoggedInUserOnly = (req,res,next) => {
//     const userId = req.cookies?.uid;
//     if(!userId) return res.redirect('/login');
//     const user = getSessionIdUser(userId);
//     console.log(user, ' -------- user from jwt verify -------- ');
//     if(!user) return res.redirect('/login');
//     req.user = user;
//     next();
// }

// const checkLoggedIn = (req,res,next) => {
//     const userId = req.cookies?.uid; // if exists
//     const user = getSessionIdUser(userId);
//     req.user = user;
//     next();
// }


// implementation for getting token from header
const restrictToLoggedInUserOnly = (req,res,next) => {
    // const userId = req.cookies?.uid;
    const token = req.headers['authorization']
    if(!userId) return res.redirect('/login');
    const user = getSessionIdUser(token.split(' ')[1]); // here i am splitting the array with space and not using 0th Bearer, but 1st index token
    console.log(user, ' -------- user from jwt verify -------- ');
    if(!user) return res.redirect('/login');
    req.user = user;
    next();
}

const checkLoggedIn = (req,res,next) => {
    // const userId = req.cookies?.uid; // if exists
    const token = req.headers['authorization']
    const user = getSessionIdUser(token.split(' ')[1]);
    req.user = user;
    next();
}


// refactoring the above code to single func and also writing authorization code
const checkForAuthentication = (req,res,next) => {
    req.user = null;
    const authorizationHeaderValue = req.headers['authorization'];
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')) 
    // return res.redirect('/login');
    return next();
    const token = authorizationHeaderValue.split(' ')[1];
    // if(!token) return res.redirect('/login');
    if(!token) return next();
    const user = getSessionIdUser(token);
    // if(!user) return res.redirect('/login');
    if(!user) return next();
    req.user = user;
    next();
}

const restrictTo = (roles = []) => {
    return function(req,res,next) {
        if(!req.user) return res.redirect('/login');
        if(!roles.includes(req.user?.role)) return res.end('Un Authorized user');
        next();
    }
}
module.exports = {restrictToLoggedInUserOnly, checkLoggedIn, checkForAuthentication, restrictTo};