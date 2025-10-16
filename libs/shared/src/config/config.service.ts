import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { AppConfig } from './config.types';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService<AppConfig>) {}

  get nodeEnv(): string {
    return this.configService.get<string>('env', 'development', { infer: true });
  }

  get port(): number {
    return this.configService.get('port', 3000, { infer: true });
  }

  get db() {
    return this.configService.getOrThrow('db', { infer: true });
  }

  get kafka() {
    return this.configService.getOrThrow('kafka', { infer: true });
  }

  get redis() {
    return this.configService.getOrThrow('redis', { infer: true });
  }

  get graphql() {
    return this.configService.getOrThrow('graphql', { infer: true });
  }

  get security() {
    return this.configService.getOrThrow('security', { infer: true });
  }
}