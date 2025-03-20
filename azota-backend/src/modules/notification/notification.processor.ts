import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { InjectModel } from "@nestjs/mongoose";
import { Notification, NotificationDocument } from "./notification.schema";
import { Model } from "mongoose";
import { NotificationGateway } from "./notifications.gateway";

@Processor("notificationQueue")
export class NotificationProcessor {
  constructor(
    private notificationsGateway: NotificationGateway,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>
  ) {}

  @Process("sendNotification")
  async handleSendNotification(job: Job) {
    const { userId, type, message, extraData } = job.data;
    console.log("process");

    this.notificationsGateway.sendNotification(userId, job.data);

    const notification = new this.notificationModel({ userId, type, message, extraData });
    notification.save();
  }
}
