const AsyncHandler = require("express-async-handler");
const Bike = require("../Modals/bike.modal");
const Reservation = require("../Modals/reservation.modal");
const User = require("../Modals/user.modal");

const GetFilteredBikes = AsyncHandler(async (req, res) => {
  const { startDate, endDate, model, color, location, rating, userRole } = req.query;

  if (!startDate && !endDate && userRole === "user") {
    res.status(400).send({
      message: "Dates are required",
    });
  } else if (
    new Date(endDate).valueOf() < new Date(startDate).valueOf() &&
    userRole === "user"
  ) {
    res.status(400).send({
      message: "End date should be greater than start date",
    });
  } else {
    var bikesReservationIds;
    if (userRole === "user") {
      bikesReservationIds = await Reservation.find({
        $and: [
          { endDate: { $gte: new Date(startDate) } },
          { startDate: { $lte: new Date(endDate) } },
        ],
      });
    }
    var reservedBikeIds = [];
    
    var query = [
      { model: { $regex: ".*" + model + ".*", $options: "i" } },
      { location: { $regex: ".*" + location + ".*", $options: "i" } },
      { color: { $regex: ".*" + color + ".*", $options: "i" } },
    ];
    if(rating){
     query.push({rating: {$gte: rating}}); 
    }
    if (bikesReservationIds?.length) {
      for (let i = 0; i < bikesReservationIds.length; i++) {
        reservedBikeIds.push(bikesReservationIds[i]["bikeId"]);
      }
      query.push({ _id: { $nin: reservedBikeIds } });
    }
    const allBikes = await Bike.find({
      $and: query,
    });
    if (allBikes.length) {
      res.status(200);
      res.send(allBikes);
    } else {
      res.send({ message: "No bike found" });
    }
  }
});

const CreateBike = AsyncHandler(async (req, res) => {
  const { model, color, location, description } = req.body;

  if (!model || !color || !location) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const newBike = await Bike.create({ model, color, location, description });

  if (newBike) {
    res.status(201).json(newBike);
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

const UpdateBike = AsyncHandler(async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const updatedBike = await Bike.findByIdAndUpdate(id, data, { new: true });
  res.status(201).json(updatedBike);
});


const DeleteBike = AsyncHandler(async (req, res) => {
  const bikeId = req.params.id;
  try{
    await Bike.findByIdAndDelete(bikeId);
    return res.status(200).send({msg: "Bike succesfully deleted !"});
  }catch(err){
    res.status(400);
    throw new Error("Invalid Bike Data");
  }
});

const RateBike = AsyncHandler(async (req, res) => {
  const { rating, bikeId, resId } = req.body;
  if (!rating || !bikeId) {
    res.status(400);
    throw new Error("Invalid Data");
  } else {
    await Reservation.findByIdAndUpdate(resId, { rating: parseInt(rating) });
    const allRatings = await Reservation.find({ bikeId }).select("rating");
    const ratingCount = allRatings.filter((el) => el.rating !== null).length;
    const ratingSum = allRatings.reduce((el, val) => {
      el = el + val.rating;
      return el;
    }, 0);
    const AvgRating = ratingSum / ratingCount;
    const updateRating = await Bike.findByIdAndUpdate(
      bikeId,
      { rating: parseInt(AvgRating) },
      { new: true }
    );
    if (updateRating) {
      res.status(201).json(updateRating);
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

const GetAllBikes = AsyncHandler(async (req, res) => {
  const bike = await Bike.find({}).sort({ created_at: -1 });
  if (bike.length) {
    res.status(200);
    res.send(bike);
  } else {
    res.send({ message: "No bike found" });
  }
});

const BikeStats = AsyncHandler(async (req, res) => {
  const ReservationsFound = await Reservation.find({});
  if(ReservationsFound.length){
    const bikeBookingDetails = await Reservation.aggregate([
      {
        $group: {
          _id: "$bikeId",
          data: {
            $push: {
              startDate: "$startDate",
              endDate: "$endDate",
              rating: "$rating",
              user: "$userId",
            },
          },
        },
      },
    ]);
  
    if (bikeBookingDetails.length) {
      for (let i = 0; i < bikeBookingDetails.length; i++) {
        let bikeId = bikeBookingDetails[i]._id;
        let eachBike = await Bike.findById(bikeId).select("model color location rating");
        const items = ["_id", "model", "color", "location", "rating"];
        if(eachBike){
          items.forEach((item) =>{
            bikeBookingDetails[i][item] = eachBike[item];
          })
        }else{
          items.forEach((item) =>{
            bikeBookingDetails[i][item] = "Bike Deleted";
          })
        }
      }

      for (let i = 0; i < bikeBookingDetails.length; i++) {
        for (let j = 0; j < bikeBookingDetails[i].data.length; j++) {
          let userId = bikeBookingDetails[i].data[j].user;
          let eachUser = await User.findById(userId).select(
            "name email"
          );
          bikeBookingDetails[i].data[j].user = eachUser;
        }
      }
      res.status(200).json(bikeBookingDetails);
    } else {
      res.send({ message: "No Bookings found" });
    }
  }
  else {
    res.send({ message: "No Bookings found" });
  }
});

module.exports = {
  CreateBike,
  BikeStats,
  GetFilteredBikes,
  UpdateBike,
  GetAllBikes,
  RateBike,
  DeleteBike
};
