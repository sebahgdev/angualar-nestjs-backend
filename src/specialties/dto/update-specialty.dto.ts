import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialtyDto } from './create-specialty.dto';
import { IsString, MinLength,IsUUID,IsOptional } from "class-validator";

export class UpdateSpecialtyDto extends PartialType(CreateSpecialtyDto) {
    @IsString()
    @IsUUID()
    readonly

    @IsString({message: `El campo name es un string`})
    @MinLength(3)
    readonly name: string;
    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly description: string;
}

