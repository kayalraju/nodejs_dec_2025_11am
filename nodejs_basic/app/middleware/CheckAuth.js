const jwt = require("jsonwebtoken")

const CheckAuth = (req, res, next) => {
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, process.env.JWT_SECRET_KEY, (err, data) => {
            req.user = data
            console.log(req.user);
            
            next()
        })
    } else {
        next()
    }
}

module.exports = CheckAuth;