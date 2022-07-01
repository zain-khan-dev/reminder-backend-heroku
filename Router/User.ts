import express from "express"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import AppDataSource from "../config/db.config"
import UserEntity from "../entity/User.entity"
import {getJWTToken} from "../Constants/utils"

dotenv.config()

const router = express.Router()


router.post("/login", async (req,res)=>{


    const {email, password} = req.body

    if (!(email && password )) {
        res.status(400).send("All inputs are required");
    }

    const userRepo =  AppDataSource.getRepository(UserEntity)


    const allUsers = await userRepo.find({where:{email:email}})

    console.log(allUsers)
    const user = allUsers[0]

    console.log(user)

    if(!user){
        return res.status(401).send("Could not find user with this email id")
    }

    console.log(user)

    if(await bcrypt.compare(password, user.password as string)){

        const token = getJWTToken(user.id, email, user.name)

        user.token = token
        return res.json(user)
    }

    return res.status(401).send("Incorrect password")

    
})


router.post("/register", async (req, res) => {

    console.log("inside register")


    const {name, email, password} = req.body

    if (!(email && password && name)) {
        res.status(400).send("All input is required");
    }

    const userRepo =  AppDataSource.getRepository(UserEntity)


    const alreadyExists = await userRepo.findOne({where:{email:email}})


    if(alreadyExists){
        return res.status(400).send("User already exists")
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = new UserEntity()

    user.name = name
    user.email = email  
    user.password = encryptedPassword
    

    await userRepo.save(user)

    const token = getJWTToken(user.id, email, name)


    user.token = token

    return res.json(user)

})

export default router