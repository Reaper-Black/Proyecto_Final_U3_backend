const mongoose = require ('mongoose')

const AnswerSchema = new mongoose.Schema({
    text: String,
    vote: {
        type: Number,
        default: 0
    }
})

const PollSchema = new mongoose.Schema({
    question: String,
    answers: [AnswerSchema]
})

const Answer = mongoose.model('Answer', AnswerSchema)
const Poll = mongoose.model('Poll', PollSchema)

module.exports = {
    Poll,
    Answer
}