import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { ConfigService } from '@chromaspace/shared';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { nodeEnv, port, security } = app.get(ConfigService);

  app.useWebSocketAdapter(new WsAdapter(app));

  app.enableCors({
    origin: security.corsOrigin,
    credetials: true
  });

  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Chat-service ready at http://localhost:${port}/graphql and running in ${nodeEnv} mode`);
}
bootstrap();