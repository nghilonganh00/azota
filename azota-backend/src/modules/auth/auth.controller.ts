import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../../common/decorators/public.decorator";
import { SignInDto, SignUpDto, UserResponseDto } from "./auth.dto";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { GoogleAuthGuard } from "./guards/google-auth/google-auth.guard";

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
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return { accessToken: data.accessToken, user: data.user };
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  async googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  async googleCallback(@Req() req, @Res({ passthrough: true }) res: Response) {
    const response = await this.authService.validateGoogleCallback(req.user.id);

    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.redirect(`http://localhost:3000?token=${response.accessToken}`);
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

  @Public()
  @Post("logout")
  @HttpCode(204)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
    });
  }
}
