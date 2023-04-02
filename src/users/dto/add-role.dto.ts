import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    //@IsString({message: 'Needs to be a string'})
    readonly value: string;
    //@IsNumber({}, {message: 'Needs to be a number'})
    readonly userId: number;
}