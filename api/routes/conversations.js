const router = require('express').Router();
const Conversation = require('../models/Conversation');

// new cov
router.post('/', async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }

    res.status(200).json(newConversation);
});

// get cov of a user
router.get('/:userId', async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
