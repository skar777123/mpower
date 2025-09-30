import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<Student>,
  ) {}

  async getCount() {
    const data = await this.StudentModel.find();
    return data.length;
  }

  async findStudent(id) {
    const data = await this.StudentModel.findById(id);
    return data;
  }

  async createStudent(dto) {
    const data = await this.StudentModel.create(dto);
    return data;
  }

  async updateStudent(id, dto) {
    const data = await this.StudentModel.findByIdAndUpdate(id, dto);
    return data;
  }
}
