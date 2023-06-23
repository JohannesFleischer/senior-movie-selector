const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        Name: { type: String, required: true },
        Duration: { type: Number, required: true },
        Year: { type: Number, required: true },
        Poster: {type: String, required: true},
        Videofile: {type: String, required: true},
        Description: { type: String, required: true } 
    },
    { timestamps: true },
)

module.exports = mongoose.model('films', Movie)
