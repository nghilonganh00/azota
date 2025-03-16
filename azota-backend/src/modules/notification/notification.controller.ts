import { Controller, Get, Inject, Query } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { NotificationService } from "./notification.service";

@Controller("notifications")
export class NotificationController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private notificationService: NotificationService
  ) {}

  @Get()
  async getNotifications() {
    const userId = this.request?.user?.sub;
    return this.notificationService.getNotifications(userId);
  }
}
