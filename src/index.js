const express = require('express')
const mongoose = require('mongoose')
const { Poll, Answer } = require('./models')
const cors = require('cors')
const bodyParser = require("body-parser");
const app = express()

app.use(express.json())
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.end('This is the backend')
})

app.post('/polls', async (req, res) => {
    const answers = req.body.answers.map(text => {
        return new Answer({ text })
    })

    const poll = new Poll({
        question: req.body.question,
        answers
    })
    res.status(201).json(await poll.save())
})

app.get('/polls/:id', async (req, res) => {
    const poll = await Poll.findById(req.params.id)
    res.json(poll)
})

app.post('/polls/:pollId/votes/:answerId', async (req, res) => {
     const result = await Poll.updateOne({
        _id: req.params.pollId,
        'answers._id': req.params.answerId
    },
        {
            '$inc': { 'answers.$.vote': 1 }
        })
        res.json(result)
})

mongoose.connect('mongodb://localhost:3002', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB')
})

app.listen(3001, () => {
    console.log('Listening to http://localhost:3001')
})