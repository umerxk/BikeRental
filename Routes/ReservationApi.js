const express = require('express');
const router = express.Router();
const { protect } = require("../Middleware/AuthMiddleware");

const {ReserveBike, GetReservations, CancelReservation} = require("../Controllers/ReservationController") ;


router.post('/', protect, ReserveBike);
router.get('/', protect, GetReservations);
router.put('/', protect, CancelReservation);



module.exports = router;
