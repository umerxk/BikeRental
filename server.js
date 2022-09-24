const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const usersApi = require("./Routes/UsersApi");
const bikesApi = require("./Routes/BikesApi");
const reservationApi = require("./Routes/ReservationApi");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", usersApi);
app.use("/bikes", bikesApi);
app.use("/reservation", reservationApi);

app.get("/", async (req, res) => {
  res.send("Yo, Server is up :)");
});

app.listen(8080, () => {
  console.log("listening on *:8080");
});

//  db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected..."))
  .catch((err) => console.log(err));
