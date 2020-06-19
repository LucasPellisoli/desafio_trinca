const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

const user = require("./server/src/routes/user.routes");
const barbecue = require("./server/src/routes/barbecue.routes");
const app = express();

let url =
  "mongodb+srv://churas:churas123@churas-p24kf.mongodb.net/churas?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || url;

app.use(express.static(path.join(__dirname, "build")));

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro na Ligação ao MongoDB"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use("/api/user", user);
app.use("/api/barbecue", barbecue);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server on: ${port}!`);
});
