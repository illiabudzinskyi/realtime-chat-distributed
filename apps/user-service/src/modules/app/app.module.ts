import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@chromaspace/shared';
import { UserModule } from '../user/user.module';

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
        autoSchemaFile: join(process.cwd(), 'schema.gql'),
        playground: true, // Will be disabled for prod
        introspection: true, // Will be disabled for prod
        // playground: config.nodeEnv !== 'production',
      })
    }),

    UserModule,
  ],
})
export class AppModule {}