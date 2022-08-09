const express = require('express')
const { AnswerModel } = require('../models/models_answer')
const { PollModel } = require ('../models/models_poll')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.end('This is the backend')
})

app.post('/polls', async (req, res) => {
    const answers = req.body.answers.map(text => {
        return new AnswerModel({ text });
    });

    const poll = new PollModel({
        question: req.body.question,
        answers
    });

    res.status(201).json(await poll.save())
})

app.get('/polls/:id', async (req, res) => {
     const poll = await PollModel.findById(req.params.id)
    res.json(poll)
 })

app.post('/polls/:pollId/votes/:answerId', async (req, res) => {
     const result = await PollModel.updateOne({
        _id: req.params.pollId,
        'answers._id': req.params.answerId
    },
        {
            '$inc': { 'answers.$.vote': 1 }
        })
        res.json(result)
})

module.exports = app;