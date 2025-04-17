import { v1 as uuidv1 } from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event: any, context: any) {
  // Get userId from cognito identity or use a default value for testing
  const userId = event.requestContext && 
                 event.requestContext.identity && 
                 event.requestContext.identity.cognitoIdentityId 
                 ? event.requestContext.identity.cognitoIdentityId 
                 : "TEST-USER-ID";

  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: userId,
      noteId: uuidv1(),
      content: data.content,
      noteColor: data.noteColor,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.error("Error in create function:", e);
    return failure({ status: false });
  }
} 