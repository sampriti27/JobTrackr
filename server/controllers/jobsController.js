import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment/moment.js";

// ********* CREATE JOBS ********
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  //validate
  if (!company || !position) {
    next("Please provide all fields!");
  }

  console.log("Before adding createdBy:", req.body);
  req.body.createdBy = req.user._id;
  console.log("After adding createdBy:", req.body);

  try {
    const job = await jobsModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Job added successfully!",
      job,
    });
  } catch (error) {
    // Handle any database errors
    console.log(error);
    return next("Error creating job");
  }
};

// ********* GET ALL JOBS ***********
export const getJobsController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;
  //condition for searching filter
  const queryObject = {
    createdBy: req.user._id,
  };

  //logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = jobsModel.find(queryObject);

  //so that the results are always latest to oldest
  queryResult = queryResult.sort("-createdAt");
  //sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }

  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }

  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  queryResult = queryResult.skip(skip).limit(limit);

  //jobs count
  const totalJobs = await jobsModel.countDocuments(queryObject);
  const numOfPage = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    success: true,
    totalJobs,
    jobs,
    numOfPage,
  });
};

// ********* UPDATE JOBS ********
export const updateJobsController = async (req, res, next) => {
  const { id } = req.params;

  const { company, position } = req.body;

  //validation
  if (!company || !position) {
    next("Please provide all fields");
  }

  //find job
  const job = await jobsModel.findOne({ _id: id });

  //validation
  if (!job) {
    next(`No jobs found with thi sid ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to update this job!");
    return;
  }

  const updatedJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  //response
  res.status(200).json({
    success: true,
    message: "Job updated successfully!",
    updatedJob,
  });
};

// ********* DELETE JOB ***************
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  //find job
  const job = await jobsModel.findOne({ _id: id });

  //validation
  if (!job) {
    next(`No job found with this id ${id}!`);
  }

  if (!req.user._id === job.createdBy.toString()) {
    next("You are not authorized to delete this job!");
    return;
  }

  await jobsModel.findByIdAndDelete({ _id: id });

  res.status(200).json({
    success: true,
    message: "Job deleted successfully!",
  });
};

// ********* JOB STATS & FILTER ***************

export const jobsStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    //search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const short_stats = stats.reduce((obj, item) => {
    obj[item._id] = item.count;
    return obj;
  }, {});

  //default stats
  const defaultStats = {
    pending: short_stats.pending || 0,
    reject: short_stats.reject || 0,
    interview: short_stats.interview || 0,
  };

  //monthly yearly stats
  let monthlyApplications = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");

      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({ totalJob: stats.length, defaultStats, monthlyApplications });
};
