import {Model, Table, Column, DataType, BelongsToMany, ForeignKey, HasMany, BelongsTo, Sequelize} from "sequelize-typescript";
import { Profile } from "src/profile/profile.model";
import { Block } from "../block/block.model";
import { FileUsage } from "./fileUsage.model";
import { DATEONLY } from "sequelize";

interface FileCreationAttrs {
    essenceTable: string;
    essenceId: number;
    filePath: string;
}

@Table({tableName: 'files'})
export class File extends Model<File, FileCreationAttrs> {

    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING})
    essenceTable: string;

    @Column({type:DataType.STRING})
    essenceId: number

    @Column({type:DataType.STRING, allowNull: false})
    filePath: string;

    @BelongsToMany(() => Profile, () => FileUsage)
    profileId: Profile

    @BelongsToMany(() => Block, () => FileUsage)
    blockId: Block
}