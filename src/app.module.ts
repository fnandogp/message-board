import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from 'src/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
