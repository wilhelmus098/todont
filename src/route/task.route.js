const express = require('express')
const router = express.Router()
const taskController = require('../controller/task.controller')
const bodyParser = require('body-parser')

//Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
router.use(bodyParser.json())

router.get('/', (req, res) => {
    taskController.getTasks().then(data => res.json(data))
})

router.get('/:id', (req, res) => {
    taskController.getTasks().then(data => res.json(data))
})

router.post('/', (req, res) => {
    console.log(req.body)
    taskController.createTask(req.body.task).then(data => res.json(data))
})

router.put('/', (req, res) => {
    taskController.updateTask(req.body.task).then(data => res.json(data))
})

router.delete('/:id', (req, res) => {
    taskController.deleteTask(req.params.id).then(data => res.json(data))
})

module.exports = router