require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/connectToDB");

// Connect to DP
connectToDB();

// init app
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth",require("./routes/auth.route"))
app.use("/api/users",require("./routes/users.route"))
app.use("/api/posts",require("./routes/posts.route"))
app.use("/api/comments",require("./routes/comments.route"))

// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server Is Running On ${PORT}`);
})
