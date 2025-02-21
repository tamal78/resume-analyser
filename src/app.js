const express = require("express");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/resume", resumeRoutes);
app.use((req, res, next) => {
  next({ status: 404, message: "Route not found" });
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
