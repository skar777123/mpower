import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { Events } from 'src/user/events.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Events.name) private EventsModel: Model<Events>,
  ) {}

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

  async registerEvent(id, event_id, event) {
    const data = await this.UserModel.findById(id);
    await this.EventsModel.findByIdAndUpdate(event_id, {
      $push: { registered: data },
    });
    const data2 = await this.UserModel.findByIdAndUpdate(id, {
      $push: {
        registration: {
          event: event,
          points: 0,
        },
      },
    });
    return {
      data: data2,
      message: 'registered',
    };
  }

  async completeEvent(id, event) {
    const data = await this.UserModel.findById(id);

    if (data?.completed.includes(event)) {
      return {
        message: 'Already completed',
      };
    } else {
      const data2 = await this.UserModel.findByIdAndUpdate(id, {
        $push: {
          completed: event,
          points: 0,
        },
      });
      return {
        data: data2,
        message: 'completed',
      };
    }
  }

  async addPoints(id, points) {
    const data = await this.UserModel.findByIdAndUpdate(id, {
      $inc: { points: +points },
    });
    return data;
  }

  async points(id) {
    const data = await this.UserModel.findById(id);
    return data?.points;
  }

  async leaderboard() {
    const data = await this.UserModel.find().sort({ points: -1 });
    return data;
  }

  async eventRegister(name: string) {
    const data = await this.EventsModel.create({
      event_name: name,
    });
    return data;
  }

  async participants() {
    const data = await this.EventsModel.find();
    return data.map((item) =>
      item?.registered.map((item2) => {
        return {
          name: item2.name,
          points: item2.points,
        };
      }),
    );
  }

  async eachParticipants(event_id) {
    const data = await this.EventsModel.findById(event_id);
    return data?.registered.map((item) => {
      return {
        name: item.name,
        points: item.points,
      };
    });
  }

  async eventCompleted(event_id, id, points: Number) {
    const data = await this.EventsModel.findById(event_id);
    const data2 = await this.UserModel.findByIdAndUpdate(id, {
      $push: {
        completed: {
          event: data?.event_name,
          points: points,
        },
      },
    });
    await this.EventsModel.findByIdAndUpdate(event_id, {
      $pull: {
        registered: id,
      },
      $push: {
        leaderboard: {
          name: data2?.name,
          points: points,
        },
      },
    });
    await this.UserModel.findByIdAndUpdate(id, {
      $inc: { points: +points },
    });
    return data2;
  }

  async eachLeaderboard(event_id) {
    const data = await this.EventsModel.findById(event_id)
      .select('leaderboard')
      
    return data?.leaderboard.sort((a, b) => Number(b.points) - Number(a.points));
  }
}
