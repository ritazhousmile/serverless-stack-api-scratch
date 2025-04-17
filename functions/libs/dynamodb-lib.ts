import { DynamoDB } from "aws-sdk";

const client = new DynamoDB.DocumentClient();

export function call(action: string, params: any) {
  return client[action](params).promise();
} 