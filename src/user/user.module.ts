import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Events, EventsSchema } from './events.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Events.name,
        schema: EventsSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class StudentModule {}
