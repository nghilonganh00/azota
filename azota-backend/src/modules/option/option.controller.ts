import { Controller } from "@nestjs/common";
import { OptionService } from "./option.service";

@Controller("options")
export class OptionController {
  constructor(private readonly optionService: OptionService) {}
}
