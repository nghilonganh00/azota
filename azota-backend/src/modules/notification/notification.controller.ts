import { Controller, Get, Inject, Param, Patch, Query } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { NotificationService } from "./notification.service";
import { query } from "express";
import { QueryParamsDto } from "src/shared/dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Notifications")
@Controller("notifications")
export class NotificationController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private notificationService: NotificationService
  ) {}

  @ApiBearerAuth()
  @Get()
  async getNotifications(@Query() query: QueryParamsDto) {
    const userId = this.request?.user?.sub;

    return this.notificationService.getNotifications(userId, query);
  }

  @ApiBearerAuth()
  @Patch(":id")
  async markAsRead(@Param("id") notificationId: string) {
    const userId = this.request?.user?.sub;

    return this.notificationService.markAsRead(userId, notificationId);
  }
}
