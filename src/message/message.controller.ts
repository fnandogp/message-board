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
  create(@Body() messageCreateDto: MessageCreateDto): Promise<Message> {
    return this.messageServices.create(messageCreateDto);
  }

  @Get(':message')
  retrieve(@Param('message', ParseEntityPipe) message: Message): Message {
    return this.messageServices.retrieve(message);
  }

  @Put(':message')
  update(
    @Param('message', ParseEntityPipe) message: Message,
    @Body() messageCreateDto: MessageCreateDto,
  ): Promise<Message> {
    return this.messageServices.update(message, messageCreateDto);
  }

  @Delete(':message')
  delete(
    @Param('message', ParseEntityPipe) message: Message,
  ): Promise<Message> {
    return this.messageServices.delete(message);
  }

  @Get()
  index(): Promise<Message[]> {
    return this.messageServices.index();
  }
}
