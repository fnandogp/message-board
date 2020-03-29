import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class ParseEntityPipe implements PipeTransform {
  constructor(private connection: Connection) {}

  async transform(value: string, metadata: ArgumentMetadata) {
    try {
      const entity = await this.connection
        .getRepository(metadata.metatype)
        .findOne(value);

      if (!entity) {
        throw new NotFoundException();
      }

      return entity;
    } catch (error) {
      if (error.message === ERROR_MESSAGES.OBJECT_ID_INVALID) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
