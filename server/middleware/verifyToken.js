const jwt = require('jsonwebtoken')

//verify user token
const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader?.startsWith('Bearer ')){ //every auth header starts with Bearer and a space
        return res.status(401).json({message: 'Unauthorized'})
    }

    const token = authHeader.split(' ')[1]// get value of token by splitting it with Bearer

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) =>{
            if(err) return res.status(403).json({message: 'Forbidden'})
            req.user = user
            next()
        }
    )
}

module.exports = verifyToken