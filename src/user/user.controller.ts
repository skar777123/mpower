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

  @Post('register/:id/:event/:event_id')
  async register(
    @Param('event') event: string,
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Param('event_id') event_id: mongoose.Schema.Types.ObjectId,
  ) {
    const data = await this.userService.registerEvent(id, event, event_id);
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

  @Get('points/:id')
  async points(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    const data = await this.userService.points(id);
    return data;
  }

  @Get('/leaderboard')
  async leaderboard() {
    const data = await this.userService.leaderboard();
    return data;
  }

  @Post('event/:name')
  async eventRegister(@Param('name') name:string){
    const data = await this.userService.eventRegister(name);
    return data;
  }
  
}
