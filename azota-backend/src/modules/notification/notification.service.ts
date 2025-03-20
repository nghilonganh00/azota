import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Notification, NotificationDocument } from "./notification.schema";

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    @InjectQueue("notificationQueue") private notificationQueue: Queue
  ) {}

  async getNotifications(userId: number) {
    return this.notificationModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async sendNotification(
    jobData: {
      userId: number;
      type: string;
      title: string;
      message: string;
      extraData?: any;
      readAt?: Date | null;
    },
    options: {
      delay?: number;
      priority?: number;
      attempts?: number;
      removeOnComplete?: boolean;
      jobId?: string;
    } = {}
  ) {
    const { delay = 0, priority, attempts = 3, removeOnComplete = true, jobId } = options;

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

  async markAsRead(notificationId: string) {
    return this.notificationModel.findByIdAndUpdate(notificationId, { read: true });
  }
}
