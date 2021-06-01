var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var recordRouter = require("./routes/record");
var imblock = require("./services/imblock");

var app = express();
var corsOptions = {
  origin: [
    "https://dashboard.catena.id",
    "https://api.catena.id",
    "https://catena.id",
    "http://localhost:8080",
    "https://imblock.catena.id",
  ],
  methods: ["GET", "PUT", "POST", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Content-Length",
    "Accept-Encoding",
    "X-CSRF-Token",
    "Authorization",
    "accept",
    "origin",
    "Cache-Control",
    "X-Requested-With",
  ],
  credentials: true,
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/record", recordRouter);

imblock.initUpcc();

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
