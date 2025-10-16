import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@chromaspace/shared';
import { RoomModule } from '../rooms/room.module';
import { MessageModule } from '../messages/message.module';
import { RedisModule } from '../redis/redis.module';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [
    ConfigModule,

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ db }: ConfigService) => ({
        type: 'postgres',
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        database: db.name,
        autoLoadEntities: true,
        synchronize: db.sync ?? true,
      })
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        autoSchemaFile: true,
        playground: config.nodeEnv !== 'production',
        introspection: config.nodeEnv !== 'production',
        csrfPrevention: false,
        installSubscriptionHandlers: false,
        subscriptions:
          config.nodeEnv === 'production' 
            ? { 'graphql-ws': { path: '/graphql' } }
            : { 'graphql-ws': { path: '/graphql' }, 'subscriptions-transport-ws': { path: '/graphql' } }
      })
    }),
    RedisModule,
    KafkaModule,
    RoomModule,
    MessageModule,
  ]
})
export class AppModule {}