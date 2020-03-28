import { IsString, MinLength, IsNotEmpty } from 'class-validator'

export class MessageCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly author: string;
}
