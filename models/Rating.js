const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = require('./User');
const SchoolModel = require('./School');

const RatingSchema = new Schema({

    schoolid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: SchoolModel,
        required: true
    },

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    },

    score: {
        type: Number,
        default: 0
    },

    created: {
        type: Date,
        default: Date.now()
    }
})
const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;