# Serverless Notes API

A serverless REST API built with SST (Serverless Stack Toolkit) and deployed to AWS.

## API Endpoints

The API is deployed and available at: https://iqd2ao0kw2.execute-api.us-east-1.amazonaws.com

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /notes | List all notes |
| GET | /notes/{id} | Get a note by ID |
| POST | /notes | Create a new note |
| DELETE | /notes/{id} | Delete a note |
| POST | /billing | Process payment for storage |
| GET | /debug | View request details (for debugging) |

## Services Used

- AWS Lambda - For serverless functions
- Amazon API Gateway - For REST API
- Amazon DynamoDB - For data storage
- AWS SSM Parameter Store - For secure secrets management

## Local Development

1. Install dependencies:
```
npm install
```

2. Deploy to your personal development stage:
```
npx sst deploy
```

## DynamoDB Schema

The Notes table uses the following schema:
- Partition Key: `userId`
- Sort Key: `noteId`

## Environment Variables

- Stripe API Secret Key is stored securely in SSM Parameter Store 