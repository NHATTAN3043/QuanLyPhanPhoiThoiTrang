const jwt = require('jsonwebtoken')

const MiddlewareController = {
    // verifytoken
    verifytoken: (req, res, next) => {
        const token = req.cookies.accessToken
        if (token) {
            // const accesstoken = token.split(" ")[1]
            jwt.verify(token, process.env.JWT_ACCESS_KEY, (error, user) => {
                if (error) {
                    console.log("LOI NE " + error)
                    return res.status(403).json("Token is not valid")
                }
                req.user = user
                // req.body = user
                next()
            })
        }else{
            // res.render('./taiKhoan/login', { layout: 'login' })
            return res.status(401).json("you're not authenticated")
        }
    },

    // verifytokenandAdmin
    verifytokenandAdmin: (req, res, next) => {
        try {
            MiddlewareController.verifytoken(req, res, () => {
                if(req.user.MaQuyen === 1 ) {
                    next()
                }else {
                    return res.status(403).json('you are not a admin')
                }
            })
        } catch (error) {
            next(error)
        }
        
    },
    // verifytokenandDeliver
    verifytokenandDeliver: (req, res, next) => {
        try {
            MiddlewareController.verifytoken(req, res, () => {
                if(req.user.MaQuyen === 3 ) {
                    next()
                }else {
                    return res.status(403).json('you are not a deliver')
                }
            })
        } catch (error) {
            next(error)
        }
        
    }

}

module.exports = MiddlewareController
