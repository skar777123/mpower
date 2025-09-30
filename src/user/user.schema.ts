import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  class: string;

  @Prop()
  contact: Number;

  @Prop()
  stream: string;

  @Prop()
  password: string;

  // @Prop()
  // registration:{
  //   Prism_Panel: "not registered",
  //   Pulse_Parande: "not registered",
  //   Unmasking_Emotions: "not registered",
  //   Roots_in_reverb: "not registered",
  //   Pigments_of_the_Psyche: "not registered",
  //   Spell_of_Stock: "not registered",
  //   Chords_of_Confluence: "not registered",
  //   Dreamcraft_Deck: "not registered",
  //   Motion_Mirage:"not registered",
  //   Scenezone: "not registered",
  //   Clash_of_Cadence: "not registered",
  //   Shadows_and_Light: "not registered",
  //   Aurora_Couture: "not registered",
  //   Aurora_Eloquence: "not registered",
  //   Note_to_self: "not registered",
  //   Inkside_out: "not registered",
  //   Cluescape: "not registered",
  //   Neuro_Muse: "not registered",
  //   Framestrom: "not registered",
  //   Stellar_Spoof:"not registered"
  // }

  // @Prop()
  // registration: mongoose.Schema.Types.Array;

  @Prop({type:[String]})
  registration: string[]; 

  @Prop({type:[String]})
  completed:string[];

  @Prop()
  points: Number;
}

export const UserSchema = SchemaFactory.createForClass(User);
