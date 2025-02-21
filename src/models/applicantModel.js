const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  education: {
    degree: String,
    institution: String,
    year: String,
  },
  experience: {
    job_title: String,
    company: String,
    start_date: String,
    end_date: String,
  },
  skills: [String],
  summary: String,
});

module.exports = mongoose.model("Applicant", applicantSchema);
