import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

// Importing routes and controllers
import postRoutes from "./routes/posts.js";

// Configuring environment variables and middleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));

// Defining routes
app.use("/posts", postRoutes);

// Default Route Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.stack) console.error(err.stack);
  res.status(err.status || 500).send('Something broke!');
});

// Setting up Mongoose and starting the server
const PORT = process.env.PORT || 6001;
mongoose
  // Local connection
  .connect("mongodb://localhost:27017/my-backend-mern-template", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  // MongoDB Atlas
  // .connect(process.env.MONGO_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => {
    console.error(`${error} did not connect`);
    // Exit process with failure
    process.exit(1); 
  });
