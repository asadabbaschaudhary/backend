const express = require("express");
const app = express();

app.get("/api/movies", async (request, response) => {
    return response.json({
        status: true,
        movies: "hello",
      });
  });


mongoose.connect(process.env.DB).then(() => {
   console.log("DB connect")
  });

  module.exports = app;