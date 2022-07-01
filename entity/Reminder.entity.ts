import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import UserInfo from "./User.entity"
@Entity()
class Reminder {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    message:String

    @Column()
    send_time:String

    @Column()
    status:String

    @ManyToOne(()=>UserInfo, )
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user:UserInfo

}

export default Reminder