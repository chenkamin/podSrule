const express = require('express')
const router = express.Router()
const unirest = require('unirest')
const APIKey = require('../../config')

const Podcast = require('../models/Podcast')

router.get('/sanity', function (req, res) {
    res.send('OK!')
})

const mapGenres = function (genresIds) {

    unirest.get(`https://listen-api.listennotes.com/api/v2/genres`)
        .header('X-ListenAPI-Key', APIKey).end(function (response) {
            const genres = response.body.genres
            const genresNames = []

            for(let i in genresIds) {
                for(let j in genres){
                    if(genresIds[i] === genres[j].id){
                        genresNames.push(genres[j].name)
                    }
                } 
            }

            return genresNames
        })

}

const createPodcastDocument = function (podcastObj) {

    const genres = mapGenres(podcastObj.genres)

    const podcastDoc = new Podcast({
        podName: podcastObj.podcast_title_original,
        episodeName: podcastObj.title_original,
        id: podcastObj.id,
        image: podcastObj.image,
        audioLink: podcastObj.audio,
        audioLength: podcastObj.audio_length,
        genres: genres,
        description: podcastObj.description_original,
        played: false,
        saved: false
    })

    return podcastDoc
}


router.get('/podcast/:podcastName', function (req, res) {

    const podName = req.params.podcastName

    unirest.get(`https://listen-api.listennotes.com/api/v2/search?q=${podName}`)
        .header('X-ListenAPI-Key', APIKey).end(function (response) {

            let podcastsRec = response.body.results
            let podcasts = []

            for (let i = 0; i < 6; i++) {
                podcasts.push(createPodcastDocument(podcastsRec[i]))
            }

            res.send(podcasts)
        })
})





module.exports = router