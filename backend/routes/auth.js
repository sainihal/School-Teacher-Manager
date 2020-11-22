const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  schoolRegisterValidation,
  schoolLoginValidation,
} = require("../validation");
require("dotenv").config();
const School = require("../models/School");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { error } = schoolRegisterValidation(req.body);
  if (error) {
    res.status(400).json({ error: true, message: error.details[0].message });
    return;
  }

  const emailExists = await School.findOne({ school_id: req.body.school_id });
  if (emailExists) {
    return res
      .status(400)
      .json({ error: true, message: "Email already exists in database" });
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "something went wrong, try again after some time",
    });
    return;
  }

  const school_data = new School({
    school_name: req.body.school_name,
    school_id: req.body.school_id,
    password: hashedPassword,
  });

  try {
    const savedSchool = await school_data.save();
    const school_name = savedSchool.school_name;
    const school_id = savedSchool.school_id;
    const user = {
      id: savedSchool["_id"],
      school_name: school_name,
      school_id: school_id,
    };
    const accessToken = jwt.sign(user, process.env.SECRET_KEY_TO_ACCESS);
    res.status(200).json({
      error: false,
      data: { schoolData: savedSchool, accessToken: accessToken },
      message: "Register Successful",
    });
  } catch (err) {
    res.status(400).json({ error: true, message: err });
  }
});

router.post("/login", async (req, res, next) => {
  const { error } = schoolLoginValidation(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });
  }
  const schoolData = await School.findOne({ school_id: req.body.school_id });
  if (!schoolData) {
    return res.status(400).json({ error: true, message: "Email not exists" });
  }
  let validPass;
  try {
    validPass = await bcrypt.compare(req.body.password, schoolData.password);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Something went wrong, try again after some tinme",
    });
  }
  if (!validPass) {
    return res.status(400).json({ error: true, message: "incorrect password" });
  } else {
    const school_name = schoolData.school_name;
    const school_id = schoolData.school_id;
    const user = {
      id: schoolData["_id"],
      school_name: school_name,
      school_id: school_id,
    };
    const accessToken = jwt.sign(user, process.env.SECRET_KEY_TO_ACCESS);
    res.status(200).json({
      error: false,
      data: { accessToken, schoolData },
      message: "Login Successful",
    });
  }
});

module.exports = router;
