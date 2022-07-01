import express,{Request, Response} from "express"
import AppDataSource from "../config/db.config"
import Reminder from "../entity/Reminder.entity"
import UserInfo from "../entity/User.entity"
import auth from "../middleware/auth"


const router = express.Router()


router.get("/all", auth, async (req:Request,res:Response)=>{

    const user = (req.user)

    console.log("user id is " + user.id)

    const dbuser = await AppDataSource.getRepository(UserInfo).findOne({relations:["reminders"], where:{id:user.user_id}})

    

    if(dbuser)
    res.json(dbuser.reminders)
    else
    res.status(401).send("User not found")

})


router.post("/create", auth, async (req:Request, res:Response) => {

    const user = req.user

    const {title, message, status, time} = req.body


    const newUser  = new  UserInfo()

    newUser.id = user.id

    newUser.email = user.email

    const reminder = new Reminder()

    reminder.title = title
    reminder.message = message
    reminder.status = status
    reminder.send_time = time

    reminder.user = user.user_id

    const newReminder = await AppDataSource.getRepository(Reminder).save(reminder)

    return res.json(newReminder)

})


router.put("/", auth, async (req:Request, res:Response) => {


    console.log("Updating vallue")
    const {updatedTitle, updatedMessage, updatedStatus, updatedTime, id} = req.body

    console.log(updatedTitle, updatedMessage, updatedStatus, updatedTime, id)

    await AppDataSource.getRepository(Reminder).save({id, title:updatedTitle, message:updatedMessage, status:updatedStatus, send_time:updatedTime})

    res.json("Updated SUccessfully")

})



router.delete("/",auth,  async (req, res)=>{

    const {reminder} = req.body

    console.log(reminder)

    console.log(reminder.id)

    await AppDataSource.getRepository(Reminder).delete(reminder.id)

    return res.json("Deleted")

})



export default router