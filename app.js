const express = require("express");
const mongoose = require("mongoose");
const path = require("path");


const app = express();

// Middleware & View Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection 
mongoose.connect("mongodb://localhost:27017/bus_booking")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Models

const TripQuote = require("./models/TripQuote");
const Stop = require("./models/Stop");
const tripTiming = require("./models/tripTiming");
const UserDetails = require("./models/UserDetails");

// Routes
app.get("/", (req, res) => {
  res.send("hi i am root");
});


app.get("/trip", (req, res) => {
  res.render("1stPage");
});

app.post("/api/trip/start", async (req, res) => {
  try {
    const { tripType, pickupLocation, destinationLocation, numberOfPeople } = req.body;

    const newQuote = new TripQuote({
      tripType,
      pickupLocation,
      destinationLocation,
      numberOfPeople
    });

    await newQuote.save();

    res.render("2ndPage",{ tripId: newQuote._id }); // or res.redirect("/nextRoute");
  } catch (err) {
    console.error("Error saving trip quote:", err);
    res.status(500).send("Something went wrong");
  }
});
     


app.post('/save-stops', async (req, res) => {
  const { tripId, location, duration } = req.body;

  if (!tripId || !location || !duration) {
    return res.status(400).send("Missing trip or stop data");
  }

  const stopsData = [];

  const locations = Array.isArray(location) ? location : [location];
  const durations = Array.isArray(duration) ? duration : [duration];

  for (let i = 0; i < locations.length; i++) {
    stopsData.push({
      tripId,
      location: locations[i],
      duration: parseInt(durations[i]),
      stopType: 'going',
    });
  }

  try {
    await Stop.insertMany(stopsData);
    res.render("3rdPage", { tripId});
  } catch (err) {
    res.status(500).send(err.message);
  }
});



app.post("/save-trip-timing", async (req, res) => {
  try {
    const { tripId, departureDate, departureTime, returnDate, returnTime } = req.body;

    const timing = new tripTiming({
      tripId,
      departureDate,
      departureTime,
      returnDate,
      returnTime
    });

    await timing.save();

    res.render("4thPage", { tripId});
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.post("/submit-user-details", async (req, res) => {
  try {
    const {
      tripId,fullName,phoneNumber,email,additionalInfo,confirmedDetails,agreedToPrivacyPolicy,
    } = req.body;

    const userDetails = new UserDetails({
      tripId,fullName,phoneNumber,email,additionalInfo, confirmedDetails: confirmedDetails === "on",
      agreedToPrivacyPolicy: agreedToPrivacyPolicy === "on",
    });

    await userDetails.save();
    res.redirect("/api/trip/start");
  } catch (err) {
    console.error("Error saving user details:", err);
    res.status(500).send("Something went wrong");
  }
});




app.get("/", (req, res) => {
  res.send("hi i am root");
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
