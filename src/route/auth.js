const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authenticationMiddleware = require('../middleware/authentication')

router.post('/login', authenticationMiddleware.generateToken, (req, res) => {})
router.get('/login', authenticationMiddleware.verifyToken, (req,res) => {})

module.exports = router