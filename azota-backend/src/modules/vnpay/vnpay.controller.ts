import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { VnpayService } from "./vnpay.service";
import { CreatePaymentUrlDto } from "./vnpay.dto";
import { Request, Response } from "express";
import { Public } from "src/common/decorators/public.decorator";

@Controller("vnpay")
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Post("create-payment-url")
  @Public()
  async createPaymentUrl(@Body() createPaymentUrlDto: CreatePaymentUrlDto, @Req() req: Request, @Res() res: Response) {
    const { amount, bankCode, orderDescription, orderType, language, clientIp } = createPaymentUrlDto;

    const ip = "127.0.0.1";
    //   (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "127.0.0.1";

    const url = this.vnpayService.createPaymentUrl({
      amount,
      bankCode,
      orderDescription,
      orderType,
      language,
      clientIp: ip,
    });

    return res.redirect(url);
  }
}
