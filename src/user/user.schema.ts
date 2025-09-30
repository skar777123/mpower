import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Student {
  @Prop()
  name: string;

  @Prop()
  course: string;

  @Prop()
  acaYear: string;

  @Prop()
  password: string;

  @Prop()
  mobile: Number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
