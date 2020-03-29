import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @ApiProperty()
  readonly author: string;
}
