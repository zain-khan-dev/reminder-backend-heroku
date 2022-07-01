"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Reminder_1 = __importDefault(require("./Router/Reminder"));
const User_1 = __importDefault(require("./Router/User"));
const auth_1 = __importDefault(require("./middleware/auth"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/reminders", Reminder_1.default);
app.use("/user", User_1.default);
app.get("/welcome", auth_1.default, (req, res) => {
    return res.json("Welcome you are authenticated");
});
app.set("PORT", process.env.PORT);
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
