import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event: any, context: any) {
  // Get userId from cognito identity or use a default value for testing
  const userId = event.requestContext && 
                 event.requestContext.identity && 
                 event.requestContext.identity.cognitoIdentityId 
                 ? event.requestContext.identity.cognitoIdentityId 
                 : "TEST-USER-ID";

  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    console.error("Error in list function:", e);
    return failure({ status: false });
  }
} 