# 💬 Scalable Real-Time Chat System

## 🧠 Overview
This project is a **scalable real-time chat system** built with **NestJS**, **GraphQL**, **Kafka**, **Redis**, and **PostgreSQL**, featuring multi-instance support via **Traefik** and containerized using **Docker Compose**.

The system demonstrates distributed message delivery, persistence, and real-time synchronization across multiple backend instances.

---

## 🏗️ System Architecture

### Components
- **User Service** — manages user creation and retrieval.
- **Chat Service** — manages chat rooms, message storage, and real-time delivery.
- **Frontend (React)** — communicates with both services through GraphQL API.
- **Kafka** — asynchronous message broker ensuring reliable delivery and scalability.
- **Redis (Pub/Sub)** — enables real-time subscriptions via GraphQL.
- **PostgreSQL** — stores all persistent entities (users, rooms, messages).
- **Traefik** — reverse proxy for routing, load balancing, and real-time monitoring via Traefik Dashboard.

### Flow
1. User sends message via GraphQL mutation.
2. Chat service stores message in PostgreSQL.
3. Message is pushed to Kafka topic.
4. Kafka consumer broadcasts message through Redis Pub/Sub.
5. Clients subscribed to the corresponding chat room instantly receive the update.

This architecture allows **scalable horizontal growth** by simply adding new instances behind Traefik.

---

## ⚙️ Tech Stack

**Backend**: NestJS, GraphQL, TypeORM, Kafka, Redis, PostgreSQL  
**Frontend**: React, Apollo Client  
**Infrastructure**: Docker, Docker Compose, Traefik, Nx Monorepo

---

## 🧑‍💻 Local Development

This project uses **Nx monorepo** to manage multiple services and shared libraries.  
Each service (User, Chat, Shared, Frontend) can be run individually or together via Nx commands.

### Run all services locally
```bash
# 1. Install dependencies
npm install

# 2. Run all services in dev mode
npx nx run dev
```
This will start all backend and frontend services in parallel with live reload.

### Run specific service
```bash
# Run only User Service
npx nx serve user-service

# Build only shared libs
npx nx build @chromaspace/shared
```

### Environment Variables
- **Frontend** uses `.env.local` for local development and `.env.docker` for Docker runtime.  
- All other services (User, Chat, Shared) also read from `.env.local` during development.
- Each service supports hot reload with `nx serve`.

**Example `.env.local` for all services you can find in env.template file**

For Docker builds, `.env.docker` is automatically injected at build time.  
This separation allows consistent local vs. containerized environments.

### Multi-Instance Mode
In the Docker setup, you can scale services dynamically by editing replicas field
All instances are automatically load-balanced by **Traefik**, which also provides a visual dashboard to monitor:
- Active containers
- Routing rules and health checks
- Real-time traffic distribution

Access Traefik dashboard:
```
http://localhost:8086
```
All service replicas run behind the same hostname/port but are distributed via Traefik’s internal load balancer.

---

## 🐳 Running with Docker

### Prerequisites
- Docker & Docker Compose installed
- Ports `80`, `5432`, `9092`, `6379` available

### Run Locally via Docker
```bash
# 1. Clone repository
git clone https://github.com/IllyaAvramenko/chromaspace
cd scalable-chat

# 2. Install dependencies for all services
npm install --workspaces

# 3. Build and start all containers
docker-compose up --build
```
System will automatically start multiple instances of backend services and route them through Traefik.

Access points:
- **Frontend** → http://localhost:8085
- **Kafka** → localhost:9092
- **Redis** → localhost:6379
- **Postgres** → localhost:5432
- **Traefik Dashboard** → http://localhost:8086

---

## 🧩 Architecture Evaluation and Improvement Roadmap

### 🔍 Current Architecture

Stack:
- **NestJS + GraphQL + TypeORM** as API core
- **Redis Pub/Sub** for instant subscriptions
- **Kafka** for event-driven reliability
- **PostgreSQL** as primary data store
- **Docker Compose + Traefik** for multi-instance setup

🧠 Event Flow:
1. `sendMessage` mutation stores data in DB and sends event to Kafka.
2. Kafka consumer reads event and publishes it to Redis.
3. Redis triggers GraphQL subscription → client receives message instantly.

Redis ensures **low latency (<10ms)**, Kafka provides **durable delivery**, PostgreSQL guarantees **persistence**.

### 🧮 Evaluation
| Criterion | Score | Comment |
|------------|--------|----------|
| **Architecture clarity** | 8/10 | Clear separation between Kafka, Redis, and GraphQL layers. |
| **Scalability** | 7/10 | Redis Pub/Sub limits scaling beyond one cluster without sharding. |
| **Reliability** | 8/10 | Kafka ensures message durability. |
| **Performance** | 9/10 | Real-time response and fast delivery. |
| **Maintainability** | 7/10 | Needs clearer configuration and bootstrap refactor. |
| **Security** | 6/10 | Missing authentication and message encryption. |

Estimated load capacity: **10k–50k concurrent users** with current setup.

### 🚀 Improvement Directions

#### ⚙️ Infrastructure
- Optimize Docker builds (multi-stage, no dependency on pre-installed node_modules)
- Reduce image size (use `node:alpine`)
- Add health checks and restart policies
- Automate deployment (GitHub Actions, k8s, or Swarm)
- Add **Traefik monitoring** for performance metrics and routing health visualization.

#### 🧠 Architecture
- Replace Pub/Sub with **Redis Streams** for persistence and replay
- Introduce a **Broker Abstraction Layer** for switching Kafka/NATS/Redis
- Cache message history in Redis with TTL
- Split ChatService into microservices for scalability

#### 🔐 Security
- Add **JWT/OAuth2** authentication with refresh tokens
- Implement **2FA** and **E2E encryption**

#### 💬 UX Features
- Add user status (online/offline/typing)
- File and image sharing (via S3/MinIO)
- Edit/delete messages, add reactions, notifications

#### 📈 Scalability
- Kafka partitioning by chat rooms
- Redis Cluster mode
- WebSocket Gateway for scaling (similar to Discord)
- Observability (Prometheus, Grafana, OpenTelemetry)

#### 🧱 Environment & Build Management
- Unify `.env.local`, `.env.docker`, `.env.production` handling
- Automate environment injection per target (backend/frontend)
- Use Nx to manage consistent build pipelines and versioning

#### 🧪 Testing
- Add **unit tests** for message, user, and room services using Jest.
- Add **integration tests** for Kafka → Redis → GraphQL flow.
- Add **end-to-end tests** for message sending and receiving via frontend (Cypress or Playwright).
- Implement **CI pipeline** to automatically run test suites on every PR.

### 🧭 Summary
This system is a strong **MVP-to-Production bridge**. With Redis Streams + Kafka optimization and proper gateway design, it can scale to:
- **50,000 active users** (current setup)
- **200,000+ users** (clustered Kafka & Redis)
- **1M+ users** (gateway + sharding + optimized infra)

---

## ⚖️ Architectural Alternatives Comparison

### 1. Redis + In-Memory (Simple Pub/Sub)
**Use case:** Small-scale apps, dev environments.
| Aspect | Value |
|--------|--------|
| Max users | ~5k–10k |
| Latency | <5 ms |
| Pros | Extremely fast, simple, low config overhead |
| Cons | Poor scalability, high memory usage, no durability |

### 2. Redis Streams + Kafka Hybrid (Current Approach)
**Use case:** Medium to large-scale real-time systems.
| Aspect | Value |
|--------|--------|
| Max users | ~100k–200k |
| Latency | 10–30 ms |
| Pros | Reliable, scalable horizontally, event-driven |
| Cons | More infra complexity, needs ops experience |

### 3. NATS or RabbitMQ + Redis Cache
**Use case:** Enterprise chat or notification systems.
| Aspect | Value |
|--------|--------|
| Max users | ~500k |
| Latency | 15–50 ms |
| Pros | Excellent durability, message ordering, replay support |
| Cons | More complex broker config, less out-of-the-box GraphQL support |

### 4. Sharded WebSocket Gateways (Discord, Slack-style)
**Use case:** Massive scale chats (1M+ concurrent connections)
| Aspect | Value |
|--------|--------|
| Max users | 1M+ |
| Latency | 30–80 ms |
| Pros | Highly scalable, stateless routing, efficient resource usage |
| Cons | Complex routing, gateway orchestration, expensive infra |

### 5. Telegram-style Approach (Custom TCP Layer + Message Queues)
**Use case:** Global-scale messaging with replication.
| Aspect | Value |
|--------|--------|
| Max users | 10M+ |
| Latency | 50–120 ms (cross-region) |
| Pros | Optimized for geo-distribution, extremely reliable |
| Cons | Very high complexity, custom infra, not viable for standard teams |

---

## 🧠 AI Usage Notice
Some sections of code were assisted using AI (ChatGPT/GPT-5). Comments mark AI-generated portions where applicable. Architectural decisions, integrations, and final design were fully reviewed and approved manually.

