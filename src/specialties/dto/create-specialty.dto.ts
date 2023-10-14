import { IsString, MinLength } from "class-validator";

export class CreateSpecialtyDto {

    @IsString({message: `El campo name es un string`})
    @MinLength(3)
    readonly name:string;
    @IsString()
    @MinLength(3)
    readonly description: string;
}
