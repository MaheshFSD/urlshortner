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

module.exports = {handleUserSignup}