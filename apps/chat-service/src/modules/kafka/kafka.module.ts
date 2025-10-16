import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@chromaspace/shared";
import { Kafka } from "kafkajs";

export const KAFKA_CLIENT = 'KAFKA_CLIENT';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: KAFKA_CLIENT,
            inject: [ConfigService],
            useFactory: ({ kafka }: ConfigService) => {
                return new Kafka({
                    clientId: kafka.clientId,
                    brokers: kafka.brokers.split(',').filter(Boolean),
                });
            }
        }
    ],
    exports: [KAFKA_CLIENT]
})
export class KafkaModule {}