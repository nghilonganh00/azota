import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { Reflector } from "@nestjs/core";
import { SharedService } from "src/shared/shared.service";

@Injectable()
export class HomeworkMustLoginGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private sharedService: SharedService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { id } = request.params;
    const homework = await this.sharedService.findHomeworkByPk(id);
    if (!homework) {
      throw new UnauthorizedException("Homework requires login");
    }

    if (!homework.isMustLogin) {
      SetMetadata(IS_PUBLIC_KEY, true);
    }
    return true;
  }
}
