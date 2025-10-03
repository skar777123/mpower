import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from './user.schema';


@Schema()
export class Events {
  @Prop()
  event_name: string;

  @Prop({ type: [Array] })
  leaderboard: [
    {
      name: string;
      points: mongoose.Schema.Types.BigInt;
    },
  ]

  @Prop({ type: [Object] })
  active_participant: User[];

  @Prop({ type: [Object] })
  participant: User[];

  @Prop({ type: [Object] })
  registered: User[];
}

export const EventsSchema = SchemaFactory.createForClass(Events);
