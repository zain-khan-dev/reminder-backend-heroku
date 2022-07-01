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
const db_config_1 = __importDefault(require("../config/db.config"));
const Reminder_entity_1 = __importDefault(require("../entity/Reminder.entity"));
const User_entity_1 = __importDefault(require("../entity/User.entity"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/all", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (req.user);
    console.log("user id is " + user.id);
    const dbuser = yield db_config_1.default.getRepository(User_entity_1.default).findOne({ relations: ["reminders"], where: { id: user.user_id } });
    if (dbuser)
        res.json(dbuser.reminders);
    else
        res.status(401).send("User not found");
}));
router.post("/create", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { title, message, status, time } = req.body;
    const newUser = new User_entity_1.default();
    newUser.id = user.id;
    newUser.email = user.email;
    const reminder = new Reminder_entity_1.default();
    reminder.title = title;
    reminder.message = message;
    reminder.status = status;
    reminder.send_time = time;
    reminder.user = user.user_id;
    const newReminder = yield db_config_1.default.getRepository(Reminder_entity_1.default).save(reminder);
    return res.json(newReminder);
}));
router.put("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Updating vallue");
    const { updatedTitle, updatedMessage, updatedStatus, updatedTime, id } = req.body;
    console.log(updatedTitle, updatedMessage, updatedStatus, updatedTime, id);
    yield db_config_1.default.getRepository(Reminder_entity_1.default).save({ id, title: updatedTitle, message: updatedMessage, status: updatedStatus, send_time: updatedTime });
    res.json("Updated SUccessfully");
}));
router.delete("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reminder } = req.body;
    console.log(reminder);
    console.log(reminder.id);
    yield db_config_1.default.getRepository(Reminder_entity_1.default).delete(reminder.id);
    return res.json("Deleted");
}));
exports.default = router;
