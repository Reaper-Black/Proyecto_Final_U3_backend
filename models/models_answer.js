const mongoose = require ('mongoose')

const AnswerSchema = new mongoose.Schema({
    text: String,
    vote: {
        type: Number,
        default: 0
    }
})
const AnswerModel = mongoose.model('Answer', AnswerSchema);

module.exports = {
    AnswerSchema,
    AnswerModel
};