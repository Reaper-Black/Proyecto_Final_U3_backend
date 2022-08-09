const { AnswerSchema } = require("./models_answer");
const mongoose = require ('mongoose')

const PollSchema = new mongoose.Schema({
    question: String,
    answers: [AnswerSchema]
})
const PollModel = mongoose.model('Poll', PollSchema);

module.exports = {
    PollSchema,
    PollModel
};