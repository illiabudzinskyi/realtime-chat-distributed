import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().default(3000),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_LOGGING: Joi.boolean().default(false),

  GRAPHQL_PLAYGROUND: Joi.boolean().default(true),
  GRAPHQL_CSRF: Joi.boolean().default(false),
  GRAPHQL_INTROSPECTION: Joi.boolean().default(true),

  KAFKA_CLIENT_ID: Joi.string().required(),
  KAFKA_BROKERS: Joi.string().required(),
  KAFKA_TOPIC: Joi.string().required(),
  KAFKA_GROUP_ID: Joi.string().required(),

  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().optional(),

  CORS_ORIGIN: Joi.string().default('*'),
});