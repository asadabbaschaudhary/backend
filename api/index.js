const express = require("express");
const app = express();
const mongoose = require("mongoose");


app.get("/api/movies", async (request, response) => {
    return response.json({
        status: true,
        movies: "hello",
      });
  });


mongoose.connect("mongodb+srv://asadabbaschaudhary:alitabattleangle1234567890@cluster0.2x5lurk.mongodb.net/moviesDb").then(() => {
   console.log("DB connect")
  });

  module.exports = app;