const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { classDataValidation } = require("../validation");
require("dotenv").config();
const authenticateToken = require("../middlewares/jwtAuthentication");
const Teacher = require("../models/Teacher");
const { v4: uuidV4 } = require("uuid");

const router = express.Router();

router.post("/addClass", authenticateToken, async (req, res) => {
  const { school_id } = req.user;
  const { teacher_id, grade, section, subject } = req.body;
  const class_id = uuidV4();
  const { error } = classDataValidation({
    teacher_id,
    grade,
    section,
    subject,
    school_id,
    class_id,
  });
  if (error) {
    res.status(400).json({ error: true, message: error.details[0].message });
    return;
  }
  try {
    const teacher_data = await Teacher.findOne({ _id: teacher_id });
    teacher_data.classes = [
      ...teacher_data.classes,
      { class_id, school_id, grade, section, subject },
    ];
    teacher_data.class_count = teacher_data.classes.length;
    const savedTeacher = await teacher_data.save();
    res.status(200).json({
      error: false,
      message: "Class added Successfully",
      data: savedTeacher,
    });
  } catch (err) {
    res.status(400).json({ error: true, message: err });
  }
});

router.post("/editClass", authenticateToken, async (req, res) => {
  const { school_id } = req.user;
  const { teacher_id, grade, section, subject, class_id } = req.body;

  const { error } = classDataValidation({
    grade,
    section,
    subject,
    school_id,
    teacher_id,
    class_id,
  });
  if (error) {
    res.status(400).json({ error: true, message: error.details[0].message });
    return;
  }
  try {
    await Teacher.update(
      { _id: teacher_id, "classes.class_id": class_id },
      {
        $set: {
          "classes.$.grade": grade,
          "classes.$.section": section,
          "classes.$.subject": subject,
        },
      }
    );
    const updated_class = await Teacher.findOne({
      _id: teacher_id,
      "classes.class_id": class_id,
    });
    if (!updated_class) {
      return res.status(400).json({
        error: true,
        message: "no teacher with given credentials present",
      });
    }
    res.status(200).json({
      error: false,
      message: "Class edited Successfully",
      data: updated_class.classes.find((ele) => ele.class_id === class_id),
    });
  } catch (err) {
    res.status(400).json({ error: true, message: err });
  }
});

router.delete(
  "/deleteClass/:teacher_id/:class_id",
  authenticateToken,
  async (req, res) => {
    const { school_id } = req.user;
    const { teacher_id, class_id } = req.params;
    try {
      const teacher_data = await Teacher.findOne({ _id: teacher_id });
      teacher_data.classes = teacher_data.classes.filter(
        (ele) => ele.class_id != class_id
      );
      teacher_data.class_count = teacher_data.classes.length;
      const savedTeacher = await teacher_data.save();
      res.status(200).json({ error: false, data: savedTeacher });
    } catch (err) {
      res.status(400).json({ error: true, message: err });
    }
  }
);

router.get("/getClassesByTeachers", authenticateToken, async (req, res) => {
  const { school_id } = req.user;
  const { teacher_id } = req.body;
  try {
    const classes = await Teacher.findOne({ _id: teacher_id }).classes;
    res.status(200).json({ error: false, data: classes });
  } catch (err) {
    res.status(400).json({ error: true, message: err });
  }
});

module.exports = router;

//     const classes = await Class.aggregate([{"$match": {'school_id': school_id}},
// {"$group" : {_id:{teacher_id:"$teacher_id"} ,count:{$sum:1}}},
// ])
