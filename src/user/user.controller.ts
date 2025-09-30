import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { StudentService } from './user.service';
import mongoose from 'mongoose';
import { studentDto } from './user.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('count')
  async count() {
    const data = await this.studentService.getCount();
    return data;
  }

  @Post('create')
  async createStudent(@Body() studentDto: studentDto) {
    const data = await this.studentService.createStudent(studentDto);
    return data;
  }

  @Get(':id')
  async profile(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    const data = await this.studentService.findStudent(id);
    return data;
  }

  //For admin
  @Patch('update/:id')
  async updateStudent(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() studentDto: studentDto,
  ) {
    const data = await this.studentService.updateStudent(id, studentDto);
    return data;
  }
}
