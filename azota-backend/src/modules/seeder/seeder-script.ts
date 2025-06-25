import { NestFactory } from "@nestjs/core";
import { SeederService } from "./seeder.service";
import { AppModule } from "src/app.module";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeederService);
  await seeder.seed();
  await app.close();
}

bootstrap().catch((err) => {
  console.error("Seeder failed", err);
});
