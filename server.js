require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const taskRouter = require('./src/route/task.route')
const authRouter = require('./src/route/auth')

const apiBaseUrl = '/api'
const port = process.env.PORT || 3000

app.use(apiBaseUrl+'/tasks', taskRouter)
app.use(apiBaseUrl+'/auth', authRouter)
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})
