# 📄 Resume Analysis API

## 🚀 Overview

The **Resume Analysis API** is a powerful backend service for extracting structured information from resumes. This API:

- Extracts text from PDF resumes.
- Processes and enriches resume data using Google Gemini LLM.
- Stores structured resume details in MongoDB.
- Provides authentication and resume search functionality.

---

## 📌 Features

✅ **User Authentication** – Secure JWT-based authentication.
✅ **Resume Parsing** – Extracts text from PDF files.
✅ **AI-Powered Data Enrichment** – Uses Google Gemini API for structured resume extraction.
✅ **MongoDB Storage** – Stores structured resume data.
✅ **Search Resumes** – Search database by name with token-agnostic search.
✅ **Global Error Handling** – Ensures proper API failure handling.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Cloud)
- **AI Integration:** Google Gemini LLM
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Render

---

## 📦 Installation & Setup

### 🔹 Prerequisites

- Node.js (v16+)
- MongoDB Cloud (Free Tier)
- Google Gemini API Key

### 🔹 Clone the Repository

```sh
$ git clone https://github.com/tamal78/resume-analyser
$ cd resume-analyser
```

### 🔹 Install Dependencies

```sh
$ npm install
```

### 🔹 Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
username="[name]"
password="[password]"
```

### 🔹 Start the Server

```sh
$ npm start
```

The server will start on **`http://localhost:5000`** 🚀

---

## 🔑 Authentication API

### **🔹 Login**

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "username": "naval.ravikant",
  "password": "05111974"
}
```

**Response:**

```json
{
  "JWT": "your_generated_token"
}
```

---

## 📄 Resume Analysis API

### **🔹 Extract & Store Resume Data**

**Endpoint:** `POST /resume/analyze`

**Headers:**

```json
{
  "Authorization": "Bearer your_token"
}
```

**Request Body:**

```json
{
  "url": "https://www.dhli.in/uploaded_files/resumes/resume_3404.pdf"
}
```

**Response:**

```json
{
  "message": "Resume stored successfully!",
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "education": {
      "degree": "BSc Computer Science",
      "institution": "XYZ University",
      "year": "2021"
    },
    "experience": {
      "job_title": "Software Engineer",
      "company": "Tech Corp",
      "start_date": "2022-01-01",
      "end_date": "Present"
    },
    "skills": ["JavaScript", "Node.js", "MongoDB"],
    "summary": "Experienced software engineer specializing in backend development."
  }
}
```

---

## 🔍 Resume Search API

### **🔹 Search Resume by Name**

**Endpoint:** `GET /resume/search`

**Headers:**

```json
{
  "Authorization": "Bearer your_token"
}
```

**Request Body:**

```json
{
  "name": "John"
}
```

**Response:**

```json
[
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "education": {
      "degree": "BSc Computer Science",
      "institution": "XYZ University",
      "year": "2021"
    },
    "experience": {
      "job_title": "Software Engineer",
      "company": "Tech Corp",
      "start_date": "2022-01-01",
      "end_date": "Present"
    },
    "skills": ["JavaScript", "Node.js", "MongoDB"],
    "summary": "Experienced software engineer specializing in backend development."
  }
]
```

---

## ⚠️ Error Handling

The API follows a structured error handling mechanism. Below are some possible error responses:

**401 Unauthorized:**

```json
{
  "error": "Unauthorized: No token provided"
}
```

**500 Internal Server Error:**

```json
{
  "error": "Error processing resume"
}
```

---

## 📞 Contact

- **Author:** Tamal Kundu
- **Email:** tamalkundu2002@gmail.com
