import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { ConnectOptions, MongooseOptions } from "mongoose";
import dotenv from "dotenv";
import adminRoute from "./features/api/admin/auth/auth.route";
import userAuthRoute from "./features/api/auth/auth.route";
import scoutTrialRoute from "./features/api/scouts/trial/trial.route";
import scoutAthleteRoute from "./features/api/scouts/athlete/athlete.route";
import athleteTrialRoute from "./features/api/athletes/trial/trial.route";
import athletePerformanceRoute from "./features/api/athletes/performanace/performance.route";


dotenv.config();


const router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    cors({
      origin: "*",
    })
);

app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/auth", userAuthRoute);
app.use("/api/v1/scout", [scoutTrialRoute, scoutAthleteRoute]);
app.use("/api/v1/athlete", [athleteTrialRoute, athletePerformanceRoute]);
// app.use("/api/v1/athlete", athletePerformanceRoute);


const MONGODB_URI = process.env.MONGODB_URI as string;
(async () => {
    try {
      mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log("Connected To Database - Initial Connection");
    } catch (err) {
      console.log(
        `Initial Distribution API Database connection error occurred -`,
        err
      );
    }
})();
  
app.use(
    "/",
    router.get("/", (req, res) => {
      res.json("Hello");
    })
);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});