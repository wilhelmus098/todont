const yup = require('yup')

let newUserSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(5).max(10).required(),
    password: yup.string().min(6).max(12).required(),
    role: yup.string().required()
})

let userLoginSchema = yup.object().shape({
    username: yup.string().min(5).max(10).required(),
    password: yup.string().min(6).max(12).required(),
})

let userUpdatePasswordSchema = yup.object().shape({
    username: yup.string().min(5).max(10).required(),
    email: yup.string().email().required(),
    old_password: yup.string().min(6).max(12).required(),
    password: yup.string().min(6).max(12).required(),
    confirm_password: yup.string().oneOf(
        [yup.ref('password'), null],
        'Passwords must match'
    )
})
module.exports = { newUserSchema, userLoginSchema, userUpdatePasswordSchema }