const jwt = require('jsonwebtoken')

// generate access token
const generateAccessToken = function(user) {
    return jwt.sign(
    {
        Email: user.Email,
        MaQuyen: user.MaQuyen,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "60m" }
    )   
}

//generate refresh token
const generateRefreshToken = function(user) {
    return jwt.sign(
    {
        Email: user.Email,
        MaQuyen: user.MaQuyen,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "30000m" }
    )          
}

module.exports = { generateAccessToken, generateRefreshToken}
