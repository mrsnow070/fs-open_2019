const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    comment: String,
    date: Date,
    likes: Number,
    user: {
        userId: String,
        username: String
    },
    subComment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Comment', commentSchema)