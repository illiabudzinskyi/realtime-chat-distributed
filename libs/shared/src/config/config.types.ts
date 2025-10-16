export interface AppConfig {
  env: string;
  port: number;
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    sync: boolean;
  };
  graphql: {
    playground: boolean;
    csrfPrevention: boolean;
    introspection: boolean;
  };
  kafka: {
    clientId: string;
    brokers: string;
    groupId: string;
    topic: string;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
  };
  security: {
    corsOrigin: string;
  };
}