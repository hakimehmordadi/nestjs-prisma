import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateLoanDto {
    @IsNotEmpty()
    @ApiProperty()
    id: number;
    
    @MinLength(5)
    @MaxLength(30)
    @IsString()
    @ApiProperty({ required: true })
    name: string;
  
    @ApiProperty({ required: true })
    length: number;
  
    @ApiProperty({ required: true })
    width: number;
  
    @ApiProperty({ required: true })
    height: number;

    @ApiProperty({ required: true })
    weight: number;

    @ApiProperty({ required: true })
    qty: number;

    @IsBoolean()
    @ApiProperty({ required: true, default: false })
    stackable?: boolean = false;

    @IsBoolean()
    @ApiProperty({ required: true, default: false })
    tiltable?: boolean = false;
}
