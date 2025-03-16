import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { InjectModel } from "@nestjs/mongoose";
import { Notification, NotificationDocument } from "./notification.schema";
import { Model } from "mongoose";

@Processor("notificationQueue")
export class NotificationProcessor {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}

  @Process("sendNotification")
  async handleSendNotification(job: Job) {
    const { userId, type, message, extraData } = job.data;

    const notification = new this.notificationModel({ userId, type, message, extraData });
    await notification.save();
  }
}
