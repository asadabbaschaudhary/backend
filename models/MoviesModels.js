const mongoose = require('mongoose');
const { Schema } = mongoose;

const MoviesSchema = new Schema( {
    name: {
        type: String,
        required: [true, "Please provide Movie name"],
    },
    feature: {
        type: String,
        required: [true, "Please provide Movie name"],
    },
    // upcoming: {
    //     type: String,
    //     required: [true, "Please provide Movie name"],
    // },
   
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
    rating: {
        type: Number,
        required: [true, "please write movie type"]
    },
    trailor: {
        type: String,
        required: [true, "please write movie type"]
    },
    // release: {
    //     type: String,
    //     required: [true, "please write the movie release year"]
    // },

    // cast : [{
    //     type: []
    // }]

}, {toJSON: {getters: true} });

function linkUrl (image) {
    return ("http://localhost:3001/" + image);
}

const MoviesModels = mongoose.model('Movie', MoviesSchema);
module.exports = MoviesModels