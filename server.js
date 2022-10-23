const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;
//prettier to save :option+shift+f
const connectDB = require('./server/database/connection')


//log request
app.use(morgan("tiny"));

//mongodb connection
connectDB();


//parse request to bodyparser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use('/',require('./server/routes/router'))

app.listen(3000, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
