const express = require("express");
const connectDB = require("./config/db");
const url = require("./routes/url");
const index = require("./routes/index");
const PORT = 5000;

const app = express();

//connect to database
connectDB();

app.use(express.json());

//Routes
app.use("/api/url", url);
app.use("/", index);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
