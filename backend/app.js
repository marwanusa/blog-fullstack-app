require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/connectToDB");
const { notFound, errorHandler } = require("./middlewares/error");

// Connect to DP
connectToDB();

// init app
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/users.route"));
app.use("/api/posts", require("./routes/posts.route"));
app.use("/api/comments", require("./routes/comments.route"));
app.use("/api/categories", require("./routes/categories.route"));

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Is Running On ${PORT}`);
});
