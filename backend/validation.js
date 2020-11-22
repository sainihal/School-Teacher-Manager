const Joi = require("joi");

const schoolRegisterValidation = (data) => {
  const schema = Joi.object({
    school_name: Joi.string().min(5).required(),
    school_id: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const schoolLoginValidation = (data) => {
  const schema = Joi.object({
    school_id: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const teacherDataValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    age: Joi.number().min(25).max(60).required(),
    gender: Joi.string().min(4).required(),
    school_id: Joi.string().required(),
  });
  return schema.validate(data);
};

const classDataValidation = (data) => {
  const schema = Joi.object({
    teacher_id: Joi.string().required(),
    school_id: Joi.string().required(),
    grade: Joi.number().min(1).max(12).required(),
    section: Joi.string().min(4).required(),
    subject: Joi.string().required(),
    class_id: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  schoolRegisterValidation,
  schoolLoginValidation,
  classDataValidation,
  teacherDataValidation,
};
