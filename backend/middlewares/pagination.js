const { compareSync } = require("bcryptjs");

function paginatedResultsforTeachers(model) {
  return async (req, res, next) => {
    const { school_id } = req.user;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const gender = req.query.filter;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    try {
      if (sort == "none" && gender == "none") {
        results.current = await model
          .find({ school_id: school_id })
          .limit(limit)
          .skip(startIndex)
          .exec();
        let length = await model
          .find({ school_id: school_id })
          .countDocuments()
          .exec();
        if (endIndex < length) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }

        if (startIndex > 0) {
          results.prev = {
            page: page - 1,
            limit: limit,
          };
        }
      } else if (sort == "none") {
        results.current = await model
          .find({ school_id: school_id, gender: gender })
          .limit(limit)
          .skip(startIndex)
          .exec();
        let length = await model
          .find({ school_id: school_id, gender: gender })
          .countDocuments()
          .exec();
        if (endIndex < length) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }

        if (startIndex > 0) {
          results.prev = {
            page: page - 1,
            limit: limit,
          };
        }
      } else if (gender == "none") {
        results.current = await model
          .find({ school_id: school_id })
          .sort({ age: sort == "ageAsc" ? 1 : -1 })
          .limit(limit)
          .skip(startIndex)
          .exec();
        let length = await model
          .find({ school_id: school_id })
          .sort({ age: sort == "ageAsc" ? 1 : -1 })
          .countDocuments()
          .exec();
        if (endIndex < length) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }

        if (startIndex > 0) {
          results.prev = {
            page: page - 1,
            limit: limit,
          };
        }
      } else {
        results.current = await model
          .find({ school_id: school_id, gender: gender })
          .sort({ age: sort == "ageAsc" ? 1 : -1 })
          .limit(limit)
          .skip(startIndex)
          .exec();
        let length = await model
          .find({ school_id: school_id, gender: gender })
          .sort({ age: sort == "ageAsc" ? 1 : -1 })
          .countDocuments()
          .exec();
        if (endIndex < length) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }

        if (startIndex > 0) {
          results.prev = {
            page: page - 1,
            limit: limit,
          };
        }
      }
      res.pagination = results;
      next();
    } catch (e) {
      res.status(500).json({ error: true, message: e.message });
    }
  };
}

module.exports = paginatedResultsforTeachers;
