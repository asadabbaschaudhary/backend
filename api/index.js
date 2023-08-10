const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MoviesModels = require("../models/MoviesModels");
const TvShowModel = require("../models/TvShowModel");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "../public/" });

app.get("/api", async (request, response) => {
    return response.json({
        status: true,
        movies: "hello",
      });
  });

  
app.use(express.json());
app.use(
  cors({
    origin: "*", // Replace with your React app's domain
    optionsSuccessStatus: 200,
  })
);



app.get("/api/movies", async (request, response) => {
  console.log("yes");

  try {
    const movies = await MoviesModels.find();
    return response.json({
      status: true,
      movies: movies,
    });
  } catch (error) {
    return response.json({
      status: false,
      msg: "NO MOVIES FOUND!",
    });
  }
});

app.get("/api/movies/featured", async (request, response) => {
  try {
    const movies = await MoviesModels.find({ feature: "1" });
    return response.json({
      status: true,
      movies: movies,
    });
  } catch (error) {
    return response.json({
      status: false,
      msg: "NO MOVIES FOUND!",
    });
  }
});

app.get("/api/movies/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const movies = await MoviesModels.findById(id);
    return response.json({
      status: true,
      movies: movies,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: "SOMETHING WENT WRONG",
    });
  }
});

app.post(
  "/api/create-movies",
  upload.single("image"),
  async (request, response) => {
    if (
      request.file.mimetype == "image/png" ||
      request.file.mimetype == "image/jpg" ||
      request.file.mimetype == "image/jpeg"
    ) {
      let ext = request.file.mimetype.split("/")[1];
      if (ext == "plain") {
        ext = "txt";
      }
      const NewImgName = request.file.path + "." + ext;
      request.body.image = NewImgName;
      fs.rename(request.file.path, NewImgName, () => {
        console.log("done");
      });
    } else {
      fs.unlink(request.file.path, () => {
        console.log("deleted");
      });
    }

    try {
      await MoviesModels.create(request.body);
      return response.json({
        status: true,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        return response.json({
          status: false,
          errors: errors,
        });
      }
    }
  }
);

app.get("/api/tvshow", async (request, response) => {
  console.log("yes");

  try {
    const TvShow = await TvShowModel.find();
    return response.json({
      status: true,
      TvShow: TvShow,
    });
  } catch (error) {
    return response.json({
      status: false,
      msg: "NO TvShows FOUND!",
    });
  }
});
app.post(
  "/api/create-TVShow",
  upload.single("image"),
  async (request, response) => {
    if (
      request.file.mimetype == "image/png" ||
      request.file.mimetype == "image/jpg" ||
      request.file.mimetype == "image/jpeg"
    ) {
      let ext = request.file.mimetype.split("/")[1];
      if (ext == "plain") {
        ext = "txt";
      }
      const NewImgName = request.file.path + "." + ext;
      request.body.image = NewImgName;
      fs.rename(request.file.path, NewImgName, () => {
        console.log("done");
      });
    } else {
      fs.unlink(request.file.path, () => {
        console.log("deleted");
      });
    }

    try {
      await TvShowModel.create(request.body);
      return response.json({
        status: true,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        return response.json({
          status: false,
          errors: errors,
        });
      }
    }
  }
);

app.delete("/api/delete-movies/:id", async (request, response) => {
  const id = request.params.id;
  try {
    await MoviesModels.findByIdAndDelete(id);
    return response.json({
      status: true,
    });
  } catch (error) {
    return response.json({
      status: false,
    });
  }
});

app.put("/api/update-movies/:id", upload.single("image") ,async  (request, response) => {
  const id = request.params.id;

  if (request.file.mimetype == "image/png" || request.file.mimetype == "image/jpg" || request.file.mimetype == "image/jpeg") {
    let ext = request.file.mimetype.split("/")[1];
    if (ext == "plain") { ext = "txt"; }
    const NewImgName = request.file.path + "." + ext;
    request.body.image = NewImgName;
    fs.rename(request.file.path, NewImgName, () => { console.log("done") });

  } else {
    fs.unlink(request.file.path, () => { console.log("deleted") });
  }

  try {
    await MoviesModels.findByIdAndUpdate(id, request.body);
    return response.json({
      status: true,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return response.json({
        status: false,
        errors: errors,
      });
    }
  }
});

app.get("/api/search", async (request, response) => {
  const search = request.query.q;
  console.log(search)
  try {
    const movies = await MoviesModels.find({
      name: { $regex: search, $options: "i" },
    });
    return response.json({
      status: true,
      movies: movies,
    });
  } catch (error) {
    return response.json({
      status: false,
      error: error.message,
    });
  }
});

app.get("/api/detail/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const movie = await MoviesModels.findById(id);
    return response.json({
      status: true,
      movie: movie,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: "SOMETHING WENT WRONG",
    });
  }
});



mongoose.connect("mongodb+srv://asadabbaschaudhary:alitabattleangle1234567890@cluster0.2x5lurk.mongodb.net/moviesDb").then(() => {
   console.log("DB connect")
  });

  module.exports = app;