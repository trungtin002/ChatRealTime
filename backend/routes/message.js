var conversation = require('../schema/conversation')
var message = require('../schema/message')
var express = require('express');
var conversationModel = require('../schema/conversation');
var messageModel = require('../schema/message');
var protect = require('../middleware/protectLogin');

var router = express.Router();

router.post('/send/:id',protect,async function (req, res,next) {
    try{
        const { message } = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await conversationModel.findOne({
            participants:{$all: [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await conversationModel.create({
                participants: [senderId, receiverId]
            })
        }
        
        var newMessage = await messageModel.create({
            senderId,
            message,
            receiverId
        });
        console.log(newMessage);
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //SOCKET 
        // await conversation.save();

        await Promise.all([conversation.save(), message.save()]);
        return res.status(200).json(newMessage);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});


router.get('/:id', protect ,async function(req, res) {
    try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await conversationModel.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); 

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).send({ error: "Internal server error" });
	}
});

module.exports = router;

