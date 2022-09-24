const AsyncHandler = require("express-async-handler");
const Reservation = require("../Modals/reservation.modal");
const Bike = require("../Modals/bike.modal");
const e = require("express");

const ReserveBike = AsyncHandler(async (req, res) => {
  const { userId, bikeId, startDate, endDate } = req.body;

  if (!userId || !bikeId || !startDate || !endDate) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const newBooking = await Reservation.create({
    userId,
    bikeId,
    startDate,
    endDate,
  });

  if (newBooking) {
    const updateBike = await Bike.updateOne(
      { _id: bikeId },
      {
        $set: {
          isReserved: true,
        },
      }
    );
    if (updateBike) {
      res.status(201).json(newBooking);
    }
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

const GetReservations = AsyncHandler(async (req, res) => {
  const bookingType = req?.query?.bookingType;
  if (!req?.user || !bookingType) {
    res.status(400);
    throw new Error("Invalid request !");
  } else {
    const currentDateTime = new Date();
    let dateLogic = {};
    let obj = {};
    if (bookingType === "Active") {
      dateLogic = {
        $and: [
          { startDate: { $lte: currentDateTime } },
          { endDate: { $gte: currentDateTime } },
        ],
        status: "booked",
      };
    } else if (bookingType === "Past") {
      dateLogic = {
        endDate: { $lt: currentDateTime },
      };
    } else if (bookingType === "Future") {
      dateLogic = {
        startDate: { $gt: currentDateTime },
      };
    }

    const finalQuery = {
      $and: [dateLogic, { userId: req.user._id }],
    };
    const myReservations = await Reservation.find(finalQuery);
    if (myReservations.length) {
      const arrayOfBikes = await Promise.all(
        myReservations.map(async (reservation) => {
          let eachBike = await Bike.findById(reservation.bikeId);
          if (eachBike) {
            obj = {
              ...eachBike._doc,
              bookingStartDate: reservation.startDate,
              bookingEndDate: reservation.endDate,
              reservationId: reservation._id,
              reservationRating: reservation.rating,
            };
            return obj;
          }
        })
      );
      const filteredData = arrayOfBikes.filter(el => el?.model !== undefined);
      const datafound = arrayOfBikes.some((el) => el?.model);
      if (datafound) {
        res.status(200).json({ data: filteredData });
      }else{
        res.status(200).json({ data: false });
      }
    }
    else{
      res.status(200).json({ data: false });
    }
  }
});

const CancelReservation = AsyncHandler(async (req, res) => {
  const { resId, bikeId } = req.query;
  try {
    const reservationCancelled = await Reservation.deleteOne({ _id: resId });
    if (reservationCancelled) {
      await Bike.updateOne({ _id: bikeId }, { isReserved: false });
    }
    res.status(200).send({
      message: "Reservation succesfully cancelled !",
    });
  } catch (err) {
    res.status(500);
    throw new Error("Internal server error");
  }
});

module.exports = { ReserveBike, GetReservations, CancelReservation };
