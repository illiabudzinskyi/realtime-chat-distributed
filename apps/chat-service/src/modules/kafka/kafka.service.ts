import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { Admin, Kafka, Producer } from 'kafkajs';
import { Message } from '../messages/message.entity';
import { KAFKA_CLIENT } from './kafka.module';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;
  private admin: Admin;

  constructor(
    @Inject(KAFKA_CLIENT) private readonly kafka: Kafka
  ) {}

  async onModuleInit() {
    this.admin = this.kafka.admin();
    await this.connectWithRetry(this.admin, 'Kafka admin');

    await this.createTopicIfNotExists('chat-messages')
    
    this.producer = this.kafka.producer();
    await this.connectWithRetry(this.producer, 'Kafka producer');

    console.log('✅ Kafka producer & admin connected');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.admin.disconnect();
  }

  private async connectWithRetry(client: any, name: string, retries = 10, delayMs = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        await client.connect();
        return;
      } catch (err) {
        console.warn(`${name} connection failed, retrying in ${delayMs}`);
        await new Promise(r => setTimeout(r, delayMs))
      }
    }
  }

  async createTopicIfNotExists(topic: string) {
    const topics = await this.admin.listTopics();

    if (!topics.includes(topic)) {
      await this.admin.createTopics({
        topics: [{ topic, numPartitions: 10, replicationFactor: 1 }]
      });
    }
  }

  async sendMessage(topic: string, message: Message) {
    await this.createTopicIfNotExists(topic);
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}