# Serverless Event Processing Pipeline (AWS)
A serverless event-driven system built with AWS services.
It accepts events via API, queues them, processes asynchronously, and stores results.

## 🧠 Overview
This project demonstrates how to build a scalable backend using:
* API Gateway (via Serverless Offline)
* AWS Lambda
* Amazon SQS (queue)
* DynamoDB (storage)

## Architecture
Client → API Gateway → Lambda (Ingest) → SQS Queue → Lambda (Processor) → DynamoDB

## How It Works
### 1. Client sends request
POST /dev/ingest

Example body:
{
  "type": "order_created",
  "data": {
    "userId": 123,
    "amount": 50
  }
}

### 2. Ingest Lambda
* generates event ID
* adds timestamp
* sends event to SQS

Response:
{
  "message": "Event queued"
}

### 3. Processor Lambda
* triggered by SQS
* reads message
* processes event
* stores it in DynamoDB

## Why This Exists
This pattern solves common backend problems:

### Without queue
* slow API responses
* blocking operations
* system crashes under load

### With queue
* fast responses
* async processing
* scalable architecture

## Real Use Cases
* Order processing systems
* Payment workflows
* Email/notification systems
* Activity tracking / analytics pipelines

## Tech Stack
* Node.js
* TypeScript
* Serverless Framework
* AWS Lambda
* Amazon SQS
* DynamoDB

## Setup
### 1. Install dependencies
npm install

### 2. Configure AWS
aws configure

Provide:
* Access key
* Secret key
* Region (same as `serverless.yml`)

### 3. Deploy resources
npm run deploy

This creates:
* SQS queue
* DynamoDB table
* Lambda functions

### 4. Run locally
npm run offline

## Testing
### Local API
curl -X POST http://localhost:3000/dev/ingest \
  -H "Content-Type: application/json" \
  -d '{"type":"test","data":{"foo":"bar"}}'

### Expected Flow
Request → API → SQS → Processor → DynamoDB

## Data Stored (DynamoDB)
{
  "id": "uuid",
  "type": "order_created",
  "data": { "userId": 123 },
  "createdAt": "timestamp"
}

## Notes
* API runs locally (`serverless-offline`)
* SQS + DynamoDB run on AWS (after deploy)
* Processor Lambda executes in AWS

## Improvements
Planned upgrades:
* Dead Letter Queue (DLQ)
* Retry mechanism
* Idempotency handling
* Event status tracking
* Local SQS + DynamoDB setup
* Structured logging

## Key Concepts Demonstrated
* event-driven architecture
* async processing
* decoupled services
* queue-based systems
* serverless design

## Purpose
This project is part of my **Git projects** to demonstrate:
* scalable backend design
* AWS serverless architecture
* real-world async workflows

If you want next, I can:
* upgrade this with **DLQ + retries (strong improvement)**
* or help you add **real business logic (orders, emails, etc.)**
* or review both projects together for your GitHub profile
