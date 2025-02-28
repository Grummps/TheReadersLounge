const mongoose = require('mongoose');

const bookClubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
    },
    currentBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    nextBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    readingList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        }
    ],
    hashed_password: {
        type: String,
        required: false,
    },
    
})

module.exports = mongoose.model('BookClub', bookClubSchema)