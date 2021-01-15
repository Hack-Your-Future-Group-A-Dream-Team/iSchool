const SchoolModel = require("../models/School");
const UserModel = require("../models/User");
const CommentModel = require("../models/Comment");
const RatingModel = require("../models/Rating");

const mongoose = require("mongoose");

const saveComment = async (req, res) => {
  try {
    const schoolid = req.body.schoolid;

    const school = await SchoolModel.findById(schoolid);

    if (school === null) {
      return res.status(500).json({
        res: `School with id ${schoolid} is not found over the database`,
      });
    }

    const userExists = UserModel.exists({ _id: req.body.userid });

    if (!userExists) {
      return res.status(500).json({
        res: `User with id ${req.body.userid} not found over the database`,
      });
    }

    const newComment = new CommentModel(req.body);
    await newComment.save();

    school.comments++;
    await school.save();

    return res.status(200).json({ new_comment: newComment });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      res: "Error when adding a comment",
    });
  }
};

const getCommentList = async (req, res) => {
  try {
    if (req.query.schoolid === null || req.query.schoolid === undefined) {
      return res.status(500).json({ error: "School is not defined" });
    }

    const comments = await CommentModel.find({
      schoolid: req.query.schoolid,
    })
      .sort("-created")
      .populate("userid", ["firstName", "lastName"]);

    console.log(comments);

    res.status(200).json({ comments: comments });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Error fetching comments" });
  }
};

const addScore = async (req, res) => {
  try {
    const schoolid = req.body.schoolid;

    const school = await SchoolModel.findById(schoolid);

    if (school === null) {
      return res.status(500).json({
        res: `School with id ${schoolid} is not found over the database`,
      });
    }

    const userExists = await UserModel.exists({ _id: req.body.userid });

    if (!userExists) {
      return res.status(500).json({
        res: `User with id ${req.body.userid} not found over the database`,
      });
    }

    const newScore = new RatingModel(req.body);
    await newScore.save();

    const rating = await RatingModel.aggregate([
      { $match: { schoolid: new mongoose.Types.ObjectId(schoolid) } },

      {
        $group: {
          _id: null,
          average: { $avg: "$score" },
        },
      },
    ]);

    school.rating = Math.round(rating[0].average);

    await school.save();

    return res.status(200).json({ res: { new_rating: school.rating } });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      res: "Error when adding a comment",
    });
  }
};

module.exports = {
  saveComment: saveComment,
  getComments: getCommentList,
  addScore: addScore,
};
