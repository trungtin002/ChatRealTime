var mongoose = require('mongoose')

var conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        },
    ],

},{timestamps: true});

module.exports = new mongoose.model('Conversation',conversationSchema);