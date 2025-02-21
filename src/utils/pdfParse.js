const pdf = require("pdf-parse");
const axios = require("axios");

const extractTextFromPDF = async (pdfUrl) => {
  try {
    if (!pdfUrl) {
      throw new Error("PDF URL is required");
    }

    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      throw new Error("Failed to fetch the PDF file from the provided URL");
    }

    const text = await pdf(response.data);

    if (!text.text || text.text.trim() === "") {
      throw new Error(
        "No text detected in the PDF. The file might be empty or not a valid text-based PDF."
      );
    }

    return text.text;
  } catch (error) {
    throw new Error(error.message || "Error extracting text from PDF");
  }
};

module.exports = { extractTextFromPDF };
