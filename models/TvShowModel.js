const mongoose = require('mongoose');
const { Schema } = mongoose;

const TvShowSchema = new Schema( {
    TvShow: {
        type: String,
        required: [true, "Please provide Movie name"],
    },

    image: {
        type: String,
        required: [true, "image is required"],
        get: linkUrl
    },
    about: {
        type: String,
        required: [true, "please write about the movie"]
    },
    genre: {
        type: String,
        required: [true, "please write movie type"]
    },
    
    season: {
        type: String,
        required: [true, "please write number of season"]
    },
}, {toJSON: {getters: true} });

function linkUrl (image) {
    return ("http://localhost:3001/" + image);
}

const TvShowModel = mongoose.model('TvShow',TvShowSchema);
module.exports = TvShowModel