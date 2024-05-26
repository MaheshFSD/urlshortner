const User = require('../models/user.model');

const handleUserSignup = async (req,res) => {
    const {name, email, password} = req.body;
    // for now i am not doing any validations here...
    await User.create({
        name,
        email,
        password
    });
    res.render('home');
}
const handleUserLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email,password});
    if(!user) return res.render('login',{
        error: 'Invalid User Credentials'
    });

    res.redirect('/');
}
module.exports = {handleUserSignup, handleUserLogin}