const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken

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
        next()
    } else {
        res.sendStatus(403)
    }
}

function generateToken(req, res, next) {
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
    })
    next()
}

module.exports = { verifyToken, generateToken }