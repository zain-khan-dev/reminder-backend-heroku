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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = __importDefault(require("../config/db.config"));
const User_entity_1 = __importDefault(require("../entity/User.entity"));
const utils_1 = require("../Constants/utils");
dotenv_1.default.config();
const router = express_1.default.Router();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("All inputs are required");
    }
    const userRepo = db_config_1.default.getRepository(User_entity_1.default);
    const allUsers = yield userRepo.find({ where: { email: email } });
    console.log(allUsers);
    const user = allUsers[0];
    console.log(user);
    if (!user) {
        return res.status(401).send("Could not find user with this email id");
    }
    console.log(user);
    if (yield bcryptjs_1.default.compare(password, user.password)) {
        const token = (0, utils_1.getJWTToken)(user.id, email, user.name);
        user.token = token;
        return res.json(user);
    }
    return res.status(401).send("Incorrect password");
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside register");
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
        res.status(400).send("All input is required");
    }
    const userRepo = db_config_1.default.getRepository(User_entity_1.default);
    const alreadyExists = yield userRepo.findOne({ where: { email: email } });
    if (alreadyExists) {
        return res.status(400).send("User already exists");
    }
    const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = new User_entity_1.default();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    yield userRepo.save(user);
    const token = (0, utils_1.getJWTToken)(user.id, email, name);
    user.token = token;
    return res.json(user);
}));
exports.default = router;
