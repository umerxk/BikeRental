const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../Middleware/AuthTokens");
const User = require("../Modals/user.modal");
const Reservation = require("../Modals/reservation.modal");
const Bike = require("../Modals/bike.modal");

const GetAllUsers = AsyncHandler(async (req, res) => {
  const user = await User.find().sort({ created_at: -1 }).select("-password");
  if (user.length) {
    res.status(200);
    res.send(user);
  } else {
    res.send({ message: "No user found" });
  }
});

const GetUserBookings = AsyncHandler(async (req, res) => {

  const ReservationsFound = await Reservation.find({});
  if(ReservationsFound.length){
    const userBookingDetails = await Reservation.aggregate([
      {
        $group: {
          _id: "$userId",
          data: {
            $push: {
              startDate: "$startDate",
              endDate: "$endDate",
              bikeId: "$bikeId",
            },
          },
        },
      },
    ]);
  
    if (userBookingDetails.length) {
      for (let i = 0; i < userBookingDetails.length; i++) {
        let userId = userBookingDetails[i]._id;
        let eachUser = await User.findById(userId).select("name email");
        const items = ["_id", "name", "email"];

        if(eachUser){
          items.forEach((item) =>{
            userBookingDetails[i][item] = eachUser[item];
          })
        }else{
          items.forEach((item) =>{
            userBookingDetails[i][item] = "Deleted User";
          })
        }
      }
      for (let i = 0; i < userBookingDetails.length; i++) {
        for (let j = 0; j < userBookingDetails[i].data.length; j++) {
          let bikeId = userBookingDetails[i].data[j].bikeId;
          let eachBike = await Bike.findById(bikeId).select(
            "model color location"
          );
          userBookingDetails[i].data[j].bikeId = eachBike;
        }
      }
      res.status(200).json(userBookingDetails);
    } else {
      res.send({ message: "No Bookings found" });
    }
  }
  else {
    res.send({ message: "No Bookings found" });
  }
});

const GetUser = AsyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).select("-password");
  if (user) {
    res.status(200);
    res.send(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const LoginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const decryptedPwd = await bcrypt.compare(password, user.password);
    if (user && decryptedPwd) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

const RegisterUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send({msg: "User already exists"})
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashPwd });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const UpdateUser = AsyncHandler(async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).select("-password");
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const DeleteUser = AsyncHandler(async (req, res) => {
  const userId = req.params.id;
  try{
    await User.findByIdAndDelete(userId);
    return res.status(200).send({msg: "User succesfully deleted !"});
  }catch(err){
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const CreateUser = AsyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPwd,
    role: role === "1" ? "manager" : "user",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

module.exports = {
  GetUser,
  LoginUser,
  RegisterUser,
  UpdateUser,
  DeleteUser,
  GetAllUsers,
  GetUserBookings,
  CreateUser,
};
