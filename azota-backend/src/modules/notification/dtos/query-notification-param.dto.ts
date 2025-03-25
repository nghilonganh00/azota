import { NotificationType } from "src/shared/constant";
import { QueryParamsDto } from "src/shared/dto";

export class QueryNotificationParamsDto extends QueryParamsDto {
  type?: NotificationType;
}

