"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Reminder_entity_1 = __importDefault(require("../entity/Reminder.entity"));
const User_entity_1 = __importDefault(require("../entity/User.entity"));
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "zainkhan",
    database: "test",
    entities: [User_entity_1.default, Reminder_entity_1.default],
    synchronize: true,
    logging: false,
});
// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
    // here you can start to work with your database
})
    .catch((error) => console.log(error));
exports.default = AppDataSource;
