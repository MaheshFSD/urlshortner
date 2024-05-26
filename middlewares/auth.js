
const {getSessionIdUser} = require('../service/auth');

const restrictToLoggedInUserOnly = (req,res,next) => {
    const userId = req.cookies?.uid;
    if(!userId) return res.redirect('/login');
    const user = getSessionIdUser(userId);
    if(!user) return res.redirect('/login');
    req.user = user;
    next();
}

const checkLoggedIn = (req,res,next) => {
    const userId = req.cookies?.uid; // if exists
    const user = getSessionIdUser(userId);
    req.user = user;
    next();
}
module.exports = {restrictToLoggedInUserOnly, checkLoggedIn};