const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  teacherDataValidation,
  schoolLoginValidation,
} = require("../validation");
require("dotenv").config();
const authenticateToken = require("../middlewares/jwtAuthentication");
const Teacher = require("../models/Teacher");
const School = require("../models/School");
const { required } = require("joi");
const paginatedResultsforTeachers = require("../middlewares/pagination")

const router = express.Router();

router.post("/addTeacher", authenticateToken, async (req, res) => {
  const { school_id } = req.user;
  const { name, age, gender } = req.body;
  const { error } = teacherDataValidation({ name, age, gender, school_id });
  if (error) {
    res.status(400).json({ error: true, message: error.details[0].message });
    return;
  }
  try {
    const teacher_data = new Teacher({ name, age, gender, school_id });
    await teacher_data.save();
    const all_teachers = await Teacher.find({ school_id: school_id });
    res.status(200).json({
      error: false,
      message: "Teacher added Successfully",
      data: all_teachers,
    });
  } catch (err) {
    res.status(400).json({ error: true, message: err });
  }
});

router.post("/editTeacher", authenticateToken, async (req, res) => {
  const { school_id } = req.user;
  const { name, age, gender, _id } = req.body;

  const { error } = teacherDataValidation({ name, age, gender, school_id });
  if (error) {
    res.status(400).json({ error: true, message: error.details[0].message });
    return;
  }
  try {
    const teacher = await Teacher.findOne({ school_id: school_id, _id: _id });
    if (!teacher) {
      return res
        .status(400)
        .json({
          error: true,
          message: "no teacher with given credentials present",
        });
    }
    teacher.name = name;
    teacher.age = age;
    teacher.gender = gender;
    const savedTeacher = await teacher.save();
    res.status(200).json({
      error: false,
      message: "Teacher edited Successfully",
      data: savedTeacher,
    });
  } catch (err) {
    res.status(400).json({ error: true, message: err });
  }
});

router.delete("/deleteTeacher/:id", authenticateToken, async (req, res) => {
  const { school_id } = req.user;
  const _id = req.params.id;
  try {
    Teacher.findByIdAndDelete(_id).then(() => {
      res.status(200).json({
        error: false,
        message: "Teacher deleted Successfully",
      });
    });
  } catch (err) {
    res.status(400).json({ error: true, message: err });
  }
});

router.get("/getAllTeachers", authenticateToken,paginatedResultsforTeachers(Teacher), async (req, res) => {
    res.status(200).json({ error: false, data: res.pagination });
});

router.get("/getTeacher/:id", authenticateToken, async (req, res) => {
  const { school_id } = req.user;
  const teacher_id = req.params.id;
  try {
    const teacher = await Teacher.findOne({ _id: teacher_id });
    res.status(200).json({ error: false, data: teacher });
  } catch (err) {
    res.status(400).json({ error: true, message: err });
  }
});

module.exports = router;
