import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentModule } from './user/user.module';
import { EventModule } from './event/event.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB'),
      }),
    }),
    StudentModule,
    EventModule,
 
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
