import { Controller, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @Post('create/:name')
  async create(@Param('name') name: string) {
    const data = await this.eventService.create(name);
    return data;
  }
}
