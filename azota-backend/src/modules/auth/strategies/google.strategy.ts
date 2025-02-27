import { Inject, Injectable } from "@nestjs/common";
import { PassportModule, PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import googleOauthConfig from "../config/google-oauth.config";
import { ConfigType } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY) private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private readonly authService: AuthService
  ) {
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ["email", "profile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { emails, name, photos } = profile;
    const email = emails?.[0]?.value || "";
    const fullname = `${name?.givenName || ""} ${name?.familyName || ""}`.trim();
    const avatarUrl = photos?.[0]?.value || "";

    const user = await this.authService.validateGoogleUser({
      email,
      fullname,
      avatarUrl,
    });

    done(null, user);
  }
}
