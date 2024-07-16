const jwt = require('jsonwebtoken')

const MiddlewareController = {
    // verifytoken
    verifytoken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accesstoken = token.split(" ")[1]
            jwt.verify(accesstoken, process.env.JWT_ACCESS_KEY, (error, user) => {
                if (error) {
                    res.status(403).json("Token is not valid")
                }
                req.user = user
                next()
            })
        }else{
            res.status(401).json("you're not authenticated")
        }
    },

    // verifytokenandAdmin
    verifytokenandAdmin: (req, res, next) => {
        try {
            MiddlewareController.verifytoken(req, res, () => {
                if(req.user.MaQuyen === 1 ) {
                    next()
                }else {
                    res.status(403).json('you are not a admin')
                }
            })
        } catch (error) {
            next(error)
        }
        
    }

}

module.exports = MiddlewareController
