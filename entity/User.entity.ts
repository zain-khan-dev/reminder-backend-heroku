import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import Reminder from "./Reminder.entity"
@Entity()
class UserInfo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email:String

    @Column()
    password:String

    @Column({nullable:true})
    token:String

    @OneToMany((type)=>Reminder, reminder=>reminder.user)
    reminders:Reminder[]

}

export default UserInfo