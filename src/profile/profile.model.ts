import {Model, Table, Column, DataType, BelongsTo, ForeignKey, HasOne, BelongsToMany} from "sequelize-typescript";
import { File } from "src/file/file.model";
import { FileUsage } from "src/file/fileUsage.model";
import { User } from "src/users/users.model";

interface ProfileCreationAttrs {
    fullName: string;
    phoneNumber: number;
}

@Table({tableName: 'profiles'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {

    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING, allowNull:false})
    fullName: string;

    @Column({type:DataType.STRING, allowNull:false})
    phoneNumber: number;

    @ForeignKey(() => User)
    @Column({type:DataType.INTEGER, allowNull:false})
    userId: number;

    @BelongsTo(() => User)
    user: User

    @BelongsToMany(() => File, () => FileUsage)
    file: File
}