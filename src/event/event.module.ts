import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Events, EventsSchema } from './events.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: Events.name,
          schema: EventsSchema,
        },
      ]),
    ],
  providers: [EventService],
  controllers: [EventController]
})
export class EventModule {}
