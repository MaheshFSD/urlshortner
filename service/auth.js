// const sessionIdToUserMap = new Map();

// const setSessionIdToUser = (id,user) => {
//     sessionIdToUserMap.set(id, user);
// };

// const getSessionIdUser = (id) => {
//     return sessionIdToUserMap.get(id);
// }







// JWT implementation ..... 
// const jwt = require('jsonwebtoken')
// // here we don't need any state 
// const secret = '$Gs$';

// const setSessionIdToUser = (user) => { // the name could be setUser 
//     // const token = jwt.sign(payload, secret)
//     const token = jwt.sign({
//         _id: user._id,
//         email: user.email
//     }, secret);
//     return token;
// };

// const getSessionIdUser = (id) => { // name could be getUser   // 
//     if(!id) return null;
//     try {
//         return jwt.verify(id, secret);
//     } catch (error) {
//         console.log(error, ' --------------- jwt error --------'); // return null;
//     }
// }





const jwt = require('jsonwebtoken')
// here we don't need any state 
const secret = '$Gs$';

// sending sessionid in response and collecting it.... for all cliends as cookies only for browsers
const setSessionIdToUser = (user) => { // the name could be setUser 
    // const token = jwt.sign(payload, secret)
    const token = jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    }, secret);
    return token;
};

const getSessionIdUser = (id) => { // name could be getUser   // 
    if(!id) return null;
    try {
        return jwt.verify(id, secret);
    } catch (error) {
        console.log(error, ' --------------- jwt error --------'); // return null;
    }
}



module.exports = {setSessionIdToUser, getSessionIdUser}