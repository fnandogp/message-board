import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  Put,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/message-create-dto';
import { Message } from 'src/message/message.entity';
import { ParseEntityPipe } from 'src/parse-entity.pipe';
import { ValidationPipe } from 'src/validation.pipe';
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
  async create(@Body() messageCreateDto: MessageCreateDto) {
    const createdMessage = await this.messageServices.create(messageCreateDto);

    return {
      message: 'Message created.',
      data: createdMessage,
    };
  }

  @Get(':message')
  @ApiOkResponse({ description: 'Message retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Given message not found.' })
  async retrieve(@Param('message', ParseEntityPipe) message: Message) {
    const retrievedMessage = await this.messageServices.retrieve(message);

    return {
      data: retrievedMessage,
    };
  }

  @Put(':message')
  @ApiOkResponse({ description: 'Message updated successfully.' })
  @ApiNotFoundResponse({ description: 'Given message not found.' })
  @ApiBadRequestResponse({
    description: 'Message not updated due to validation issues.',
  })
  async update(
    @Param('message', ParseEntityPipe) message: Message,
    @Body() messageCreateDto: MessageCreateDto,
  ) {
    const updatedMessage = await this.messageServices.update(
      message,
      messageCreateDto,
    );

    return {
      message: 'Message updated.',
      data: updatedMessage,
    };
  }

  @Delete(':message')
  @ApiOkResponse({ description: 'Message deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Given message not found.' })
  async delete(@Param('message', ParseEntityPipe) message: Message) {
    await this.messageServices.delete(message);

    return {
      message: 'Message deleted.',
    };
  }

  @Get()
  @ApiOkResponse({ description: 'Message(s) retrieved successfully.' })
  async index() {
    const messages = await this.messageServices.index();

    return {
      data: messages,
    };
  }
}
