import {Model, Table, Column, DataType, BelongsToMany, ForeignKey, HasMany, BelongsTo} from "sequelize-typescript";
import { Profile } from "src/profile/profile.model";
import { Block } from "../block/block.model";
import { File } from "./file.model";

interface FileUsageCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'file_usage'})
export class FileUsage extends Model<File, FileUsageCreationAttrs> {

    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => File)
    @Column({type:DataType.NUMBER})
    fileId: number;

    @ForeignKey(() => Profile)
    @Column({type:DataType.NUMBER})
    profileId: number

    @ForeignKey(() => Block)
    @Column({type:DataType.NUMBER})
    blockId: number
}