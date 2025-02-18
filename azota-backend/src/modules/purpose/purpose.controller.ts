import { Controller, Get } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { PurposeDto } from "./dtos/purpose.dto";
import { PurposeService } from "./purpose.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Purpose")
@Controller("purposes")
export class PurposeController {
  constructor(private readonly purposeService: PurposeService) {}

  @Public()
  @Get()
  async getAll(): Promise<PurposeDto[]> {
    return this.purposeService.getAll();
  }
}
