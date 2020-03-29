import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
  Put,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/message-create-dto';
import { Message } from 'src/message/message.entity';
import { ParseEntityPipe } from 'src/parse-entity.pipe';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageServices: MessageService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() messageCreateDto: MessageCreateDto) {
    return this.messageServices.create(messageCreateDto);
  }

  @Get(':message')
  retrieve(@Param('message', ParseEntityPipe) message: Message) {
    return this.messageServices.get(message);
  }

  @Put(':message')
  update(
    @Param('message', ParseEntityPipe) message: Message,
    @Body() messageCreateDto: MessageCreateDto,
  ) {
    return this.messageServices.update(message, messageCreateDto);
  }

  @Delete(':message')
  delete(@Param('message', ParseEntityPipe) message: Message) {
    return this.messageServices.delete(message);
  }
}
