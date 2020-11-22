const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  school_id: {
    type: String,
    required: true,
  },
  classes: {
    type: Array,
  },
  class_count: {
    type: Number,
  },
});

module.exports = mongoose.model("TeacherData", TeacherSchema);
