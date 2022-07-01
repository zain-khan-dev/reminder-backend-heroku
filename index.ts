import "reflect-metadata"
import express,{Request, Response} from "express"
import dotenv from "dotenv"
import ReminderRouter from "./Router/Reminder"
import UserRouter from "./Router/User"
import auth from "./middleware/auth"
import cors from "cors"

dotenv.config()

const app = express();
const port = process.env.PORT;


app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use("/reminders", ReminderRouter)

app.use("/user", UserRouter)



app.get("/welcome", auth, (req:Request, res:Response)=>{
  return res.json("Welcome you are authenticated")
})


app.set("PORT", process.env.PORT)

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
