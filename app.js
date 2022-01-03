var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var cors = require("cors");
var Species = require("./models/species");
var Problem = require("./models/problem");
var ProblemDetail = require("./models/problemdetail");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// DB connection

var mongoose = require("mongoose");

MONGODB_URL =
  "mongodb+srv://IndVet:ariscell@cluster0.pd62f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to %s", MONGODB_URL);
      console.log("App is running ... \n");
      console.log("Press CTRL + C to stop the process. \n");
    }
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });

var db = mongoose.connection;

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
// app.use(cors());
app.use(cors({ origin: true, credentials: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// form APIs
app.use("/add", require("./controller/addDetails"));

// for selecting species
app.get("/species", (req, res) => {
  Species.find().then((specie) => res.json(specie));
});

// for searching species
app.get("/species/:specific", (req, res) => {
  Species.find({ species: req.params.specific }).then((specie) =>
    res.json(specie)
  );
});

// for selecting problems
app.get("/problem/:specific", (req, res) => {
  Problem.find().then((problem) => res.json(problem));
});
// for searching problems
app.get("/problem/:specific", (req, res) => {
  Problem.find({ problem: req.params.specific }).then((problem) =>
    res.json(problem)
  );
});

// for selecting problemDetail
app.get("/problemDetail/:specific", (req, res) => {
  ProblemDetail.find().then((problemDetail) => res.json(problemDetail));
});

// for searching problemDetail
app.get("/problemDetail/:specific", (req, res) => {
  ProblemDetail.find({ _id: req.params.specific }).then((problemDetail) =>
    res.json(problemDetail)
  );
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
