"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./features/api/admin/auth/auth.route"));
const athlete_route_1 = __importDefault(require("./features/api/admin/athletes/athlete.route"));
const scout_route_1 = __importDefault(require("./features/api/admin/scouts/scout.route"));
const auth_route_2 = __importDefault(require("./features/api/general/auth/auth.route"));
const trial_route_1 = __importDefault(require("./features/api/scouts/trial/trial.route"));
const athlete_route_2 = __importDefault(require("./features/api/scouts/athlete/athlete.route"));
const trial_route_2 = __importDefault(require("./features/api/athletes/trial/trial.route"));
const performance_route_1 = __importDefault(require("./features/api/athletes/performanace/performance.route"));
const profile_route_1 = __importDefault(require("./features/api/athletes/profile/profile.route"));
const message_route_1 = __importDefault(require("./features/api/general/message/message.route"));
const notification_route_1 = __importDefault(require("./features/api/general/notification/notification.route"));
const message_socket_1 = require("./shared/services/websocket/message.socket");
dotenv_1.default.config();
const router = express_1.default.Router();
const app = (0, express_1.default)();
// Create HTTP server
const server = http_1.default.createServer(app);
// Initialize Socket.io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"]
    }
});
global.io = io;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/api/v1/admin", [auth_route_1.default, athlete_route_1.default, scout_route_1.default]);
app.use("/api/v1/auth", auth_route_2.default);
app.use("/api/v1/scout", [trial_route_1.default, athlete_route_2.default]);
app.use("/api/v1/athlete", [trial_route_2.default, performance_route_1.default, profile_route_1.default]);
app.use("/api/v1/general", [message_route_1.default, notification_route_1.default]);
// app.use("/api/v1/athlete", athletePerformanceRoute);
io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);
    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
    // Example of a custom event
    socket.on("send_message", (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Received message: ${data}`);
        yield (0, message_socket_1.sendMessage)(data);
    }));
});
const MONGODB_URI = process.env.MONGODB_URI;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected To Database - Initial Connection");
    }
    catch (err) {
        console.log(`Initial Distribution API Database connection error occurred -`, err);
    }
}))();
app.use("/", router.get("/", (req, res) => {
    res.json("Hello");
}));
const port = process.env.PORT || 8000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
server.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`🔌 WebSocket server is running`);
});
