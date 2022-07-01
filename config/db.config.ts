import { DataSource } from "typeorm"
import Reminder from "../entity/Reminder.entity"
import UserEntity from "../entity/User.entity"  

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "zainkhan",
    database: "test",
    entities: [UserEntity, Reminder],
    synchronize: true,
    logging: false,
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))


export default AppDataSource