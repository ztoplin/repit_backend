const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log('IN APP/MIDDLEWARE', req.headers, req.body)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("X-Frame-Options", "sameorigin");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  res.header("X-XSS-Protection", "1; mode=block");
  next();
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((_, _2, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  const { message } = err;
  // set locals, only providing error in development
  res.locals.message = message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
