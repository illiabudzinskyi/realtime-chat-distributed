import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@chromaspace/shared";
import Redis from "ioredis";

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: REDIS_CLIENT,
            inject: [ConfigService],
            useFactory: ({ redis: { host, port } }: ConfigService) => {
                return new Redis({ 
                    host, 
                    port,
                    retryStrategy: (times) => Math.min(times * 50, 2000)
                })
            }
        }
    ],
    exports: [REDIS_CLIENT]
})
export class RedisModule {}