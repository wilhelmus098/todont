const userValidationSchema = require('../validation/user')

function validateUpdatePassword(req, res, next) {
    try {
        userValidationSchema.userUpdatePasswordSchema.validateSync(req.body.user)
        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = { validateUpdatePassword }