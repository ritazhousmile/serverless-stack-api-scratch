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
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: userId,
      noteId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    console.error("Error in get function:", e);
    return failure({ status: false });
  }
} 