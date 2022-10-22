const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require('path')
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;
//prettier oto save :option+shift+f

//log request
app.use(morgan("tiny"));

//parse request to bodyparser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")


//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/css',express.static(path.resolve(__dirname,"assets/img")))
app.use('/css',express.static(path.resolve(__dirname,"assets/js")))


app.get("/", (req, res) => {
  res.send("crud app is ready");
});

app.listen(3000, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
