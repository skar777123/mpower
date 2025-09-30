import { Module } from '@nestjs/common';
import { StudentController } from './user.controller';
import { StudentService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
