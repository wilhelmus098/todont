const userValidationSchema = require('../validation/user')
const userService = require('../service/user')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const saltRounds = 10

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken

        jwt.verify(req.token, process.env.TOKEN_SECRET, (err,authData) => {
            var test = Date.now()
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).send({ success: false, message: 'Unauthorized! Access Token was expired!' });
            }
            else if(err)
                res.sendStatus(403);
            else{
                res.json({
                    message:"Welcome to Profile",
                    userData:authData,
                    datenow:test
                })
            }
        })
        next()
    } else {
        res.sendStatus(403)
    }
}

async function generateToken(req, res, next) {
    
    try {
        // validate request body
        await userValidationSchema.userLoginSchema.validate(req.body)

        // get user by username
        await userService.getUserByUsername(req.body.username).then((user) => {
            if(user !== null) {

                //compare plain password vs hashed password
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (err) {
                        res.status(401).json({
                            message: err.message
                        })
                    }
                    if (result) {
                        jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN }, function(err, token) {
                            if (err){
                                res.status(401).json({
                                    message: "(jwt.sign error: )"+err.message
                                })
                            } else {
                                res.json({
                                    token
                                })
                            }
                        })
                    } else {
                        res.status(401).json({
                            message: "Incorrect username or password"
                        })
                    }
                })
            } else {
                res.status(401).json({
                    message: "Username not found on db"
                })
            }
        })
    } catch(err) {
        res.status(401).json({
            message: "(Validation error) : "+err.message
        })
    }
    next()
}

function validateSignUp(req, res, next) {
    try {
        userValidationSchema.newUserSchema.validateSync(req.body.user)
        req.body.user.password = req.body.user.password
        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
   }
}

async function hashPassword(req, res, next) {
    try {
        const hash = await bcrypt.hash(req.body.user.password, saltRounds)
        req.body.user.password = hash
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
    next()
}

function test(req, res, next) {
    console.log('inites//////////////////////////////////////////////////////////////////////')
}

module.exports = { verifyToken, generateToken, validateSignUp, hashPassword, test }