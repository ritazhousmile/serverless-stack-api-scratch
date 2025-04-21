# Serverless Notes API

A serverless REST API built with SST (Serverless Stack Toolkit) and deployed to AWS.

## API Endpoints

The API is deployed and available at: https://iqd2ao0kw2.execute-api.us-east-1.amazonaws.com

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /notes | List all notes |
| GET | /notes/{id} | Get a note by ID |
| POST | /notes | Create a new note |
| PUT | /notes/{id} | Update a note |
| DELETE | /notes/{id} | Delete a note |
| POST | /notes/{id}/enhance | Enhance note with ChatGPT |
| POST | /billing | Process payment for storage |
| GET | /debug | View request details (for debugging) |

## Services Used

- AWS Lambda - For serverless functions
- Amazon API Gateway - For REST API
- Amazon DynamoDB - For data storage
- AWS SSM Parameter Store - For secure secrets management
- OpenAI API - For ChatGPT note enhancement

## ChatGPT Note Enhancement

The API includes a feature to enhance notes using ChatGPT:

1. When a note is sent to the `/notes/{id}/enhance` endpoint, the content is processed by OpenAI's GPT model
2. The enhanced version is stored in the DynamoDB table with the original note
3. Both the original content and enhanced content are returned in the response

## Local Development

1. Install dependencies:
```
npm install
```

2. Set required secrets:
```
npx sst secrets set STRIPE_SECRET_KEY sk_test_your_stripe_key
npx sst secrets set OPENAI_API_KEY your_openai_api_key
```

3. Deploy to your personal development stage:
```
npx sst deploy
```

## DynamoDB Schema

The Notes table uses the following schema:
- Partition Key: `userId`
- Sort Key: `noteId`
- Additional fields:
  - `content`: Original note content
  - `enhancedContent`: ChatGPT enhanced version of the note
  - `noteColor`: Color tag for the note
  - `attachment`: Optional file attachment
  - `createdAt`: Timestamp when note was created
  - `updatedAt`: Timestamp when note was last updated

## Environment Variables

- Stripe API Secret Key is stored securely in SSM Parameter Store
- OpenAI API Key is stored securely in SSM Parameter Store 