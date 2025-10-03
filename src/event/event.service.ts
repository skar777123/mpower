import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Events } from './events.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventService {
  constructor(@InjectModel(Events.name) private EventsModel: Model<Events>) {}

  async create(name: string) {
    const data = await this.EventsModel.create({
      event_name: name,
      leaderboard: {},
      active_participant: {},
    })
    return data;
  }
}
