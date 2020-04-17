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

  async retrieve(message: Message): Promise<Message> {
    return await Promise.resolve(message);
  }

  async update(
    message: Message,
    messageCreateDto: MessageCreateDto,
  ): Promise<Message> {
    const updatedMessage = { ...message, ...messageCreateDto };
    return await this.messageRepository.save(updatedMessage);
  }

  async delete(message: Message): Promise<Message> {
    return await this.messageRepository.remove(message);
  }

  async index(): Promise<Message[]> {
    return await this.messageRepository.find();
  }
}
