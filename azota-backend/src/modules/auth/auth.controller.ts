import { Body, Controller, HttpCode, HttpStatus, Post, Res, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../../common/decorators/public.decorator";
import { SignInDto, SignUpDto, UserResponseDto } from "./auth.dto";
import { ApiTags } from "@nestjs/swagger";
import { sign } from "crypto";
import { Response } from "express";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  @HttpCode(200)
  async login(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ accessToken: string; user: UserResponseDto }> {
    const data = await this.authService.login(signInDto.username, signInDto.password);
    console.log("data: ", data);
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return { accessToken: data.accessToken, user: data.user };
  }

  @Public()
  @Post("signup")
  async register(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }

  @Public()
  @Post("refresh-token")
  async refreshToken(@Res({ passthrough: true }) res: Response) {
    const refreshToken = res.req.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token not found");
    }

    const tokens = await this.authService.refreshToken(refreshToken);
    return { accessToken: tokens.accessToken };
  }
}
