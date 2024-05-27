
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

module.exports = {restrictToLoggedInUserOnly, checkLoggedIn};