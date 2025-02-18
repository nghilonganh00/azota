import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../../common/decorators/public.decorator";
import { SignInDto, SignUpDto, UserResponseDto } from "./auth.dto";
import { ApiTags } from "@nestjs/swagger";
import { sign } from "crypto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  @HttpCode(200)
  signIn(
    @Body() signInDto: SignInDto
  ): Promise<{ accessToken: string; user: UserResponseDto }> {
    console.log(
      `username: ${signInDto.username} password: ${signInDto.password}`
    );
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post("signup")
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
