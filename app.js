require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// db connection
require("./models/database").connectDatabase();

//cors
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://stock-whisperer.onrender.com"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: ["http://localhost:5173", "https://stock-whisperer.onrender.com"],
    credentials: true,
    maxAge: 1800,
    methods: "POST, GET, OPTIONS, DELETE, PUT",
    allowedHeaders: ["content-type"],
  })
);

//logger
const logger = require("morgan");
app.use(logger("tiny"));

//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookie
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieParser());

// routes
app.use("/", require("./routes/indexRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/user", require("./routes/usersRoutes"));

//serving the frontend
app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client/dist/index.html"),
    function (err) {
      console.log(err);
      res.status(500).send(err);
    }
  );
});

//error handling
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/error");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Request URL Not Found: ${req.url}`), 404);
});
app.use(generatedErrors);

app.listen(
  process.env.PORT,
  console.log(`server running on port ${process.env.PORT}`)
);
