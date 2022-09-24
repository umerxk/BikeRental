const express = require('express');
const router = express.Router();
const { protect } = require("../Middleware/AuthMiddleware");

const {CreateBike, GetAllBikes, UpdateBike, GetFilteredBikes, RateBike, BikeStats, DeleteBike} = require("../Controllers/BikeController") ;


router.post('/', protect, CreateBike);
router.get('/', GetFilteredBikes);
router.put('/:id', protect, UpdateBike);
router.get("/fetchAll", GetAllBikes);
router.post("/rate",protect, RateBike);
router.delete("/:id",protect, DeleteBike);
router.get("/getBikeStats",protect, BikeStats);



module.exports = router;
