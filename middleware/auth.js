const { User } = require('../models/User');

let auth = (req, res, next) => {

    //process authorization

    //1. get the token from the client's cookie
    let token = req.cookies.x_auth;

    //2. decode token with jwt to get user ID
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();
    })

    //3. if user exists, then authorization passes.
}


module.exports = { auth };