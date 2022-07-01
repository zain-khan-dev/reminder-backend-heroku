"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getJWTToken = (id, email, name) => {
    const token = jsonwebtoken_1.default.sign({ user_id: id, email, name }, process.env.TOKEN_KEY, {
        expiresIn: "5h",
    });
    return token;
};
exports.getJWTToken = getJWTToken;
