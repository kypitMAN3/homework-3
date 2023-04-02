import {Model, Table, Column, DataType, BelongsToMany, HasOne, ForeignKey} from "sequelize-typescript";
import { Token } from "src/auth/token.model";
import { Profile } from "src/profile/profile.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING, unique: true, allowNull:false})
    email: string;

    @Column({type:DataType.STRING, allowNull:false})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasOne(() => Profile)
    profile: Profile

    @HasOne(() => Token)
    token: Token
}