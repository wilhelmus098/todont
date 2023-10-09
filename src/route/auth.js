const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authenticationMiddleware = require('../middleware/authentication')

router.post('/login',(req, res) => {
    const user = {
        id: Date.now(),
        userEmail: 'user1@mail.com',
        password: '123456'
    }

    jwt.sign({ user }, 'secret', { expiresIn: 100 }, function(err, token) {
        // console.log(token);
        res.json({
            token
        })
    });
})

router.get('/login', authenticationMiddleware.verifyToken, (req,res) => {
    jwt.verify(req.token,'secret',(err,authData) => {
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
})

module.exports = router