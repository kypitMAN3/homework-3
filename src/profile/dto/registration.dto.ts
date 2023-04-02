import { IsEmail, IsString, Length } from "class-validator";

export class RegistrationDto {
    readonly email: string;
    readonly password: string;
    readonly fullName: string;
    readonly phoneNumber: number;
}