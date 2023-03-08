// import mongoose
const mongoose = require("mongoose");

// connect database
 mongoose.connect("mongodb+srv://SabanaBinsi:Bins607@cluster0.f2jujrd.mongodb.net/MovieApp?retryWrites=true&w=majority")

// schema
const Schema = mongoose.Schema;

var movieSchema = new Schema({
Moviename : String,
actor : String,
Actress : String,
dirctr : String,
prdcr : String,
rlsdyr : Number,
cam : String,
lang : String
});

var MoviesInfo = mongoose.model("movies",movieSchema);

module.exports = MoviesInfo;