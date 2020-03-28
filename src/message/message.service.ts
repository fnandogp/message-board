import { Injectable } from '@nestjs/common';
import { MessageCreateDto } from './dto/message-create-dto';
import { Message } from 'src/message/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}

  create(messageCreateDto: MessageCreateDto) {
    return this.messageRepository.save(messageCreateDto);
  }
}
