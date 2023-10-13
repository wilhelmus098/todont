const express = require('express')
const router = express.Router()
const authenticationMiddleware = require('../middleware/authentication')
const bodyParser = require('body-parser')
router.use(bodyParser.json())

router.post('/login', authenticationMiddleware.generateToken, (req, res) => {})
router.get('/login', authenticationMiddleware.verifyToken, (req,res) => {})

module.exports = router