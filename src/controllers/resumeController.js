const Applicant = require("../models/applicantModel");
const { extractTextFromPDF } = require("../utils/pdfParse");
const { encrypt, decrypt } = require("../utils/encryption");
const { geminiApi } = require("../utils/gemini");

const analyzeResume = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) return next({ status: 400, message: "PDF URL is required" });

    const extractedText = await extractTextFromPDF(url);
    if (!extractedText)
      return next({ status: 500, message: "No text detected in the PDF" });

    const prompt = `Extract structured resume details from the following text:\n${extractedText}`;

    const geminiResponse = await geminiApi.generateContent(prompt);
    const enrichedDataString =
      geminiResponse.response.candidates?.[0]?.content?.parts?.[0]?.text ||
      null;

    if (!enrichedDataString) {
      return next({
        status: 500,
        message: "Gemini API response is empty or malformed.",
      });
    }

    let enrichedData;
    try {
      enrichedData = JSON.parse(enrichedDataString);
      console.log("enrichedData", enrichedData);
    } catch (err) {
      return next({
        status: 500,
        message: "Failed to parse resume data from Gemini API response.",
      });
    }

    if (!enrichedData.name || !enrichedData.email) {
      return next({
        status: 500,
        message: "Missing required resume details in response.",
      });
    }

    const newApplicant = new Applicant({
      name: encrypt(enrichedData.name),
      email: encrypt(enrichedData.email),
      education: enrichedData.education,
      experience: enrichedData.experience,
      skills: enrichedData.skills,
      summary: enrichedData.summary,
    });

    await newApplicant.save();
    res
      .status(200)
      .json({ message: "Resume stored successfully!", data: enrichedData });
  } catch (error) {
    next(error);
  }
};

const searchResume = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return next({ status: 400, message: "Search name is required" });

    const resumes = await Applicant.find();
    const decryptedResumes = resumes.map((resume) => ({
      name: decrypt(resume.name),
      email: decrypt(resume.email),
      education: resume.education,
      experience: resume.experience,
      skills: resume.skills,
      summary: resume.summary,
    }));

    const filteredResumes = decryptedResumes.filter((resume) =>
      resume.name.toLowerCase().includes(name.toLowerCase())
    );

    if (filteredResumes.length === 0) {
      return next({ status: 404, message: "No matching resume found" });
    }

    res.status(200).json(filteredResumes);
  } catch (error) {
    next(error);
  }
};

module.exports = { analyzeResume, searchResume };
