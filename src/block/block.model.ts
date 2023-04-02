import {Model, Table, Column, DataType, BelongsToMany, ForeignKey, HasMany} from "sequelize-typescript";
import { File } from "src/file/file.model";
import { FileUsage } from "src/file/fileUsage.model";

interface BlockCreationAttrs {
    blockGroup: string;
    title: string;
    content: string;
    image: string;
}

@Table({tableName: 'blocks'})
export class Block extends Model<Block, BlockCreationAttrs> {

    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING})
    blockGroup: string;

    @Column({type:DataType.STRING})
    title: string;

    @Column({type:DataType.STRING})
    content: string;

    @Column({type:DataType.STRING})
    image: string;

    @BelongsToMany(() => File, () => FileUsage)
    files: File[]
}

