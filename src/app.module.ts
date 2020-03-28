import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'message-board',
      entities: ['dist/**/*.entity{ .ts,.js}'],
      synchronize: true,
    }),
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
