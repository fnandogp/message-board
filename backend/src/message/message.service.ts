import { Injectable } from '@nestjs/common';
import { MessageCreateDto } from './dto/message-create-dto';
import { Message } from 'src/message/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(messageCreateDto: MessageCreateDto): Promise<Message> {
    return await this.messageRepository.save(messageCreateDto);
  }

  retrieve(message: Message): Message {
    return message;
  }

  async update(
    message: Message,
    messageCreateDto: MessageCreateDto,
  ): Promise<Message> {
    const updatedMessage = { ...message, ...messageCreateDto };
    return this.messageRepository.save(updatedMessage);
  }

  async delete(message: Message): Promise<Message> {
    return this.messageRepository.remove(message);
  }

  async index(): Promise<Message[]> {
    return this.messageRepository.find();
  }
}
