import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validationSchema } from './config.validation';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env.local',
        `.env.${process.env.NODE_ENV ?? 'development'}`,
        '.env',
      ],
      load: [configuration],
      validationSchema,
      cache: true,
      expandVariables: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService, NestConfigModule],
})
export class ConfigModule {}