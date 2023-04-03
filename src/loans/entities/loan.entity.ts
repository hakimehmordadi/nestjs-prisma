import { ApiProperty } from "@nestjs/swagger";

export class Loan {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    length: number;
  
    @ApiProperty()
    width: number;
  
    @ApiProperty()
    height: number;
  
    @ApiProperty()
    weight: number;
  
    @ApiProperty()
    qty: number;
  
    @ApiProperty()
    stackable: boolean;
  
    @ApiProperty()
    tiltable: boolean;
  
    @ApiProperty()
    createdAt: Date;
  
    @ApiProperty()
    updatedAt: Date;
}
