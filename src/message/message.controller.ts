import { Controller, Body, Post, ValidationPipe, UsePipes } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/message-create-dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageServices : MessageService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() messageCreateDto: MessageCreateDto) {
    console.log("messageCreateDto", messageCreateDto);
    return this.messageServices.create(messageCreateDto);
  }
}
