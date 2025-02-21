const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const resumeSchema = {
  description: "Structured resume information",
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: "Candidate's full name",
      nullable: false,
    },
    email: {
      type: SchemaType.STRING,
      description: "Candidate's email address",
      nullable: false,
    },
    education: {
      type: SchemaType.OBJECT,
      description: "Education details",
      properties: {
        degree: {
          type: SchemaType.STRING,
          description: "Degree obtained",
          nullable: true,
        },
        branch: {
          type: SchemaType.STRING,
          description: "Field of study",
          nullable: true,
        },
        institution: {
          type: SchemaType.STRING,
          description: "University/College Name",
          nullable: true,
        },
        year: {
          type: SchemaType.STRING,
          description: "Graduation year",
          nullable: true,
        },
      },
      required: ["degree", "institution"],
    },
    experience: {
      type: SchemaType.OBJECT,
      description: "Work experience details",
      properties: {
        job_title: {
          type: SchemaType.STRING,
          description: "Most recent job title",
          nullable: true,
        },
        company: {
          type: SchemaType.STRING,
          description: "Most recent company name",
          nullable: true,
        },
        start_date: {
          type: SchemaType.STRING,
          description: "Start date of the job",
          nullable: true,
        },
        end_date: {
          type: SchemaType.STRING,
          description: "End date of the job (or 'Present')",
          nullable: true,
        },
      },
      required: ["job_title", "company"],
    },
    skills: {
      type: SchemaType.ARRAY,
      description: "List of skills",
      items: { type: SchemaType.STRING },
      nullable: true,
    },
    summary: {
      type: SchemaType.STRING,
      description: "Brief summary of the candidate",
      nullable: true,
    },
  },
  required: ["name", "email"],
};

const geminiApi = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: resumeSchema,
  },
});

module.exports = { geminiApi };
