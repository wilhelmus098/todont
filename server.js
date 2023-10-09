require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
// import * as jwt from "jsonwebtoken"
const bodyParser = require('body-parser')
const taskRouter = require('./src/route/task.route')
const apiBaseUrl = '/api'
const app = express()
const port = process.env.PORT || 3000

app.use(apiBaseUrl+'/tasks', taskRouter)
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})

app.post('/api/login',(req, res) => {
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

app.get('/api/login',verifyToken,(req,res) => {
    jwt.verify(req.token,'secret',(err,authData)=>{
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

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}