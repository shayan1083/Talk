const rateLimit = require('express-rate-limit')
const {logEvens} = require('./logger')

const loginLimiter = rateLimit({
    windowMs: 60*1000, //1 minute
    max:5, //limit each ip to 5 loging requests per window per minute
    message: {
        message: 'Too many login attemps from this IP, please try again after 1 minute'
    },
    handler: (req,res,next,options) =>{
        logEvents(`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders:true, //return rate limit info in the RateLimit-* headers
    legacyHeaders: false, //disable the X-RateLimit-* headers
})

module.exports = loginLimiter