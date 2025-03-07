import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        
        text: {
            type: String,
            required: true
        },
        // If this comment is a reply, parentComment will hold
        // the comment's _id to which it replies. Otherwise, null.
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            default: null
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        // An array of references to child comments (replies)
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Comment', commentSchema)
