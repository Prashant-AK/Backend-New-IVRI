var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/jwt");
const User = require("../models/UserModel");
const Doctor = require("../models/DoctorModel");
const callStatus = require("../models/callStatus");
const Specialization = require("../models/specializationCategory");
const jwtrequire = require("../middlewares/jwt");

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      fatherName,
      email,
      password,
      aadhar_number,
      dob,
      mobile_number,
      address,
      location,
      no_animal_holding,
    } = req.body;
    if (!(email && password && fullName && fatherName)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      fatherName,
      aadhar_number,
      dob,
      mobile_number,
      address,
      location,
      email: email.toLowerCase(),
      password: encryptedPassword,
      no_animal_holding,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});
// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});
// REGISTER DOCTOR
router.post("/create-doctor", async (req, res) => {
  const { fullName, email, address, mobno, expertise, password } = req.body;
  try {
    const oldUser = await Doctor.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    const doc = await Doctor.create({
      fullName,
      address,
      email: email.toLowerCase(),
      mobno,
      expertise,
      encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: doctor._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    doc.token = token;
    res.status(200).send(doc);
  } catch (error) {
    console.log(error);
  }
});
// DOCTOR LOGIN
router.post("/doctorlogin", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const doctor = await Doctor.findOne({ email });

    if (doctor && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: doctor._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      doctor.token = token;
      res.status(200).json(doctor);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

// get doctor list from the database and also check the user should be login
router.get("/doctor", async (req, res) => {
  try {
    const data = await Doctor.find();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});
//getDoctor According to Specailization
router.get("/doctor/:expertise", async (req, res) => {
  try {
    const data = await Doctor.find({ expertise: req.params.expertise });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

//Add Call Stataus
router.post("/addCall", jwtrequire, async (req, res) => {
  try {
    //req.body is equal model of callStatus
    const addCall = await callStatus.create({ ...req.body });
    res.status(200).send(addCall);
  } catch (error) {
    console.log(error);
  }
});

//Get Pending Call Status
router.get("/getPendingCall", async (req, res) => {
  try {
    const userId = req.body.userId;
    const allcallitem = await callStatus.find({
      userId: userId,
      status: "pending",
    });
    res.status(200).send(allcallitem);
  } catch (error) {
    console.log(error);
  }
});

//Set Pending Call
router.post("/setPendingCall", async (req, res) => {
  //req.body.id is equal callStatus id
  const pendingcall = await CallStatus.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { status: "pending" } },
    { new: true }
  );
  res.status(200).json(pendingcall);
});

//Set Completed Call
router.post("/setCompletedCall", async (req, res) => {
  //req.body.id is equal callStatus id
  const completedcall = await CallStatus.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { status: "compeleted" } },
    { new: true }
  );
  res.status(200).json(completedcall);
});

//Get Compeleted Call Status
router.get("/getCompletedCall", async (req, res) => {
  try {
    const userId = req.body.userId;
    const allcallitem = await callStatus.find({
      uuserId: userId,
      status: "completed",
    });
    res.status(200).send(allcallitem);
  } catch (error) {
    console.log(error);
  }
});
// Doctor Pending Calls
router.get("/doc-pending-calls/:id", async (req, res) => {
  try {
    const data = await callStatus.find({ docId: req.params.id });
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});
// Doctor Completed Calls
router.get("/doc-pending-calls/:id", async (req, res) => {
  try {
    const data = await callStatus.find({ docId: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});
// Doctor request Calls Accept/Decline
router.get("/doc-accept-call/:id", async (req, res) => {
  try {
    await callStatus.findByIdAndUpdate(req.params.id, {
      callReq: true,
    });
    res.status(200).send({ msg: "Call Request Accepted" });
  } catch (error) {
    console.log(error);
  }
});

//Add Specialization Category Name
router.post("/addSpecialization", async (req, res) => {
  try {
    const addSpecialization = await Specialization.create({
      ...req.body,
    });
    res.status(200).send(addSpecialization);
  } catch (error) {
    console.log(error);
  }
});
//getSpecialization
router.get("/getSpecialization", async (req, res) => {
  try {
    const specialization = await Specialization.find();
    res.status(200).send(specialization);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
