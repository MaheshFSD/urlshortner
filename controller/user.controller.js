const User = require('../models/user.model');
const {v4: uuidv4} = require('uuid');
const {setSessionIdToUser} = require('../service/auth');

const handleUserSignup = async (req,res) => {
    const {name, email, password} = req.body;
    // for now i am not doing any validations here...
    await User.create({
        name,
        email,
        password,
        role: 'ADMIN'
    });
    res.render('home');
}

// sending token using cookies for only browser clients...


// const handleUserLogin = async (req, res) => {
//     const {email, password} = req.body;
//     const user = await User.findOne({email,password});
//     if(!user) return res.render('login',{
//         error: 'Invalid User Credentials'
//     });
//     const sessionId = uuidv4();
//     res.cookie('uid', sessionId);
//     setSessionIdToUser(sessionId, user);
//     res.redirect('/');
// }

// jwt implementation ....
// const handleUserLogin = async (req, res) => {
//     const {email, password} = req.body;
//     const user = await User.findOne({email,password});
//     if(!user) return res.render('login',{
//         error: 'Invalid User Credentials'
//     });
//     // const sessionId = uuidv4();
//     const token = setSessionIdToUser(user);
//     res.cookie('uid', token);
//     res.redirect('/');
// }

// sending token in response.... for all clients.
const handleUserLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email,password});
    if(!user) return res.render('login',{
        error: 'Invalid User Credentials'
    });
    const sessionId = uuidv4();
    const token = setSessionIdToUser(user);
    // res.cookie('uid', token);
    res.json({token});
}

module.exports = {handleUserSignup, handleUserLogin}