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
import { ParseEntityPipe } from 'src/ParseEntityPipe';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageServices: MessageService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'Message created successfully.' })
  @ApiBadRequestResponse({
    description: 'Message not created due to validation issues.',
  })
  create(@Body() messageCreateDto: MessageCreateDto): Promise<Message> {
    return this.messageServices.create(messageCreateDto);
  }

  @Get(':message')
  @ApiOkResponse({ description: 'Message retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Given message not found.' })
  retrieve(@Param('message', ParseEntityPipe) message: Message): Message {
    return this.messageServices.retrieve(message);
  }

  @Put(':message')
  @ApiOkResponse({ description: 'Message updated successfully.' })
  @ApiNotFoundResponse({ description: 'Given message not found.' })
  @ApiBadRequestResponse({
    description: 'Message not updated due to validation issues.',
  })
  update(
    @Param('message', ParseEntityPipe) message: Message,
    @Body() messageCreateDto: MessageCreateDto,
  ): Promise<Message> {
    return this.messageServices.update(message, messageCreateDto);
  }

  @Delete(':message')
  @ApiOkResponse({ description: 'Message deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Given message not found.' })
  delete(
    @Param('message', ParseEntityPipe) message: Message,
  ): Promise<Message> {
    return this.messageServices.delete(message);
  }

  @Get()
  @ApiOkResponse({ description: 'Message(s) retrieved successfully.' })
  index(): Promise<Message[]> {
    return this.messageServices.index();
  }
}
