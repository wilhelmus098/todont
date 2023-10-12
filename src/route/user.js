const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const bodyParser = require('body-parser')
const authenticationMiddleware = require('../middleware/authentication')

//Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next();
})
router.use(bodyParser.json());

router.get('/', (req, res) => {
    userController.getUsers().then(data => res.json(data));
})

router.post('/', authenticationMiddleware.validateSignUp, (req, res) => {
    userController.createUser(req.body.user).then(data => res.json(data));
})

module.exports = router