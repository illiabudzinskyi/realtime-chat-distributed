import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@chromaspace/shared';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { nodeEnv, port, security } = app.get(ConfigService);

  app.enableCors({
    origin: security.corsOrigin,
    credetials: true
  });

  await app.listen(port);
  
  console.log(`🚀 User-service ready at http://localhost:${port}/graphql and running in ${nodeEnv} mode`);
}
bootstrap();