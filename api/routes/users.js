const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json('account has been updated');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        return res.status(403).json('you can update only your account');
    }
});

// delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.deleteOne({ _id: req.params.id });
            res.status(200).json('account has been deleted');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        return res.status(403).json('you can delete only your account');
    }
});
// get a user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;

    console.log(userId, username);
    try {
        const user = !!userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
});

// flollow a user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json('user has been followed');
            } else {
                res.status(403).json('you allready follow this user');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You cant follow yourself');
    }
});
// unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json('user has been unfollow');
            } else {
                res.status(403).json('you allready unfollow this user');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You cant unfollow yourself');
    }
});

// get all user ----
router.get('/', async (req, res) => {
    try {
        const userList = await User.find();
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
