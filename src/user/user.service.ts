import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async createUser(dto) {
    const data = await this.UserModel.create(dto);
    return {
      data: data,
      id: data._id,
    };
  }

  async loginUser(contact, password) {
    const data = await this.UserModel.findOne({
      contact: contact,
    });
    if (!data) {
      return 'Not Found';
    }
    if (data) {
      if (data.password === password) {
        return {
          data: data,
          message: 'Succefully Login',
        };
      }
    }
  }

  async registerEvent(id, event) {
    const data = await this.UserModel.findById(id);

    if (data?.registration.includes(event)) {
      return {
        message: 'Already registered',
      };
    } else {
      const data2 = await this.UserModel.findByIdAndUpdate(id, {
        $push:{
          registration: event
        }
      });
      return {
        data: data2,  
        message: 'registered'
      };
    }
  }
}
