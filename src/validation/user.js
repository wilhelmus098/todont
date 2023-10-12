const yup = require('yup')

let newUserSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(5).max(10).required(),
    password: yup.string().min(6).max(12).required(),
    role: yup.string().required()
})

module.exports = { newUserSchema }