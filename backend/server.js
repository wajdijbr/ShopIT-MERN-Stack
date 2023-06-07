const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// Handle Uncaught execptions

process.on("uncaughtException", (err) => {
  console.log(`ERROR/ ${err.message}`);
  console.log(`Shutting down server due to uncaught exception`);
  process.exit(1);
});

//setting up config file
dotenv.config({ path: "backend/config/config.env" });

// Connecting to Database

connectDatabase();

// Setting Up cloudinary configuration

cloudinary.config({
  cloud_name: "dq73eow5j",
  api_key: "738489638833232",
  api_secret: "fydcbCYOG61RL4Si7zKq8bVzXLA",
});
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise rejections
process.on("unhandleRejection", (err) => {
  console.log(`ERROR:${err.stack}`);
  console.log(`Shutting down the server due to Unhandled Promise rejection`);
  process.exit(1);
});
