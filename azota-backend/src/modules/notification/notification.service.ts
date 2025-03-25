import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Notification, NotificationDocument } from "./notification.schema";
import { QueryParamsDto } from "src/shared/dto";
import { UserService } from "../user/user.service";
import { FindManyOptions } from "typeorm";
import { CreateNotificationDto } from "./dtos/create-notification.dto";
import { QueryNotificationParamsDto } from "./dtos/query-notification-param.dto";
import { ExamNotification, HomeworkNotification } from "src/shared/constant";

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    @InjectQueue("notificationQueue") private notificationQueue: Queue,
    private readonly userService: UserService
  ) {}

  async getNotifications(userId: number, query: QueryNotificationParamsDto) {
    const {
      page = 1,
      limit = 30,
      searchField,
      searchKeyword,
      sortField = "createdAt",
      sortOrder = "ASC",
      type,
    } = query;

    const user = await this.userService.findByPk(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const filter: any = { userId };

    if (searchField && searchKeyword) {
      filter[searchField] = { $regex: new RegExp(searchKeyword, "i") };
    }

    const typeFilter = {
      HOMEWORK: Object.values(HomeworkNotification),
      EXAM: Object.values(ExamNotification),
    };

    if (type && typeFilter[type]) {
      filter.type = typeFilter[type];
    }

    console.log("filter", filter);

    const sortDirection = sortOrder.toUpperCase() === "DESC" ? -1 : 1;

    const notifications = await this.notificationModel
      .find(filter)
      .sort({ [sortField]: sortDirection })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.notificationModel.countDocuments(filter);

    return {
      data: notifications,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    };
  }

  async create(newNotification: CreateNotificationDto) {
    const notification = new this.notificationModel(newNotification);
    return await notification.save();
  }

  async sendNotification(
    jobData: Notification,
    options: {
      delay?: number;
      priority?: number;
      attempts?: number;
      removeOnComplete?: boolean;
      jobId?: string;
    } = {}
  ) {
    const { delay = 0, priority, attempts = 3, removeOnComplete = true, jobId } = options;
    console.log("sendNotification", jobData);
    await this.notificationQueue.add(
      "sendNotification",
      { ...jobData, createdAt: Date.now() },
      {
        delay,
        priority,
        attempts,
        removeOnComplete,
        jobId,
      }
    );
  }

  async markAsRead(userId: number, notificationId: string) {
    const notification = await this.notificationModel.findById(notificationId);

    if (!notification) {
      throw new NotFoundException("Notification not found");
    }

    if (notification.userId !== userId) {
      throw new ForbiddenException("You cannot mark this notification as read");
    }

    return this.notificationModel.findByIdAndUpdate(notificationId, { readAt: new Date() }, { new: true });
  }
}
