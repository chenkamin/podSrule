const mongoose = require('mongoose')
const Schema = mongoose.Schema

let podcastSchema = new Schema({
    PodName: String,
    episodeName: String,
    id: String,
    image: String,
    audio_link: String,
    audio_length: Number,
    genres : [],
    description: String,
    played: Boolean,
    saved: Boolean
})

const Podcast = mongoose.model("Podcast", podcastSchema)
module.exports = Podcast