

//check user age middleware
const checkUser = (req, res, next) => {
    const { age } = req.query
    
    if(age < 18) {
        return res.status(403).json({
            success: false,
            message: 'Access Denied'
        })
    }
    next();
}



module.exports = checkUser