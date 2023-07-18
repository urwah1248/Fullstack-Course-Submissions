const testingRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

testingRouter.post('/reset', async (req, res) => {
    try {
        await Blog.deleteMany({});
        await User.deleteMany({});
        res.status(204).end();
    } catch (err) {
        console.error("Error occurred while resetting the database:", err);
        res.status(500).json({ error: "Failed to reset the database" });
    }
})

module.exports = testingRouter