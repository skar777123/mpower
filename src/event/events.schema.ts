import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Events {
  @Prop()
  event_name: string;

  @Prop({ type: Object })
  leaderboard: object;

  @Prop({ type: Object })
  active_participant: object;
}

export const EventsSchema = SchemaFactory.createForClass(Events);
