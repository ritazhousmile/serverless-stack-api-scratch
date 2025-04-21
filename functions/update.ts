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
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      userId: userId,
      noteId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET content = :content, noteColor = :noteColor, attachment = :attachment, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":content": data.content || null,
      ":noteColor": data.noteColor || null,
      ":attachment": data.attachment || null,
      ":updatedAt": Date.now()
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success(result.Attributes);
  } catch (e) {
    console.error("Error updating note:", e);
    return failure({ status: false });
  }
} 