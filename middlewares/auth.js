
const {getSessionIdUser} = require('../service/auth');

const restrictToLoggedInUserOnly = (req,res,next) => {
    const userId = req.cookies?.uid;
    console.log(userId, ' ------ from middleware --------');
    if(!userId) return res.redirect('/login');
    const user = getSessionIdUser(userId);
    if(!user) return res.redirect('/login');
    req.user = user;
    next();
}

module.exports = {restrictToLoggedInUserOnly};