import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import mongoose from 'mongoose';
import { studentDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async createUser(@Body() dto: studentDto) {
    const data = await this.userService.createUser(dto);
    return data;
  }

  @Post('login')
  async login(
    @Body('contact') contact: Number,
    @Body('password') password: string,
  ) {
    const data = await this.userService.loginUser(contact, password);
    return data;
  }

  @Post('register/:id/:event')
  async register(
    @Param('event') event: string,
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ) {
    const data = await this.userService.registerEvent(id, event);
    return data;
  }

  @Post('completed/:id/:event')
  async completed(
    @Param('event') event: string,
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ) {
    const data = await this.userService.completeEvent(id, event);
    return data;
  }

  @Post('addPoints/:id/:points')
  async addPoints(
    @Param('points') points: Number,
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ) {
    const data = await this.userService.addPoints(id, points);
    return data;
  }
}
