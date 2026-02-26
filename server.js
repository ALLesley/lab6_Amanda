const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectMongo = require("./server/database/connect");
const productRoutes = require("./server/routes/productRoutes");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging
app.use(morgan("tiny"));

// Static files
app.use(express.static("assets"));

// Connect to MongoDB
connectMongo();

app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
