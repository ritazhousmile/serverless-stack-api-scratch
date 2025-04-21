import * as dynamoDbLib from "./libs/dynamodb-lib";
import { enhanceNote } from "./libs/openai-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event: any, context: any) {
  // Get userId from cognito identity or use a default value for testing
  const userId = event.requestContext && 
                 event.requestContext.identity && 
                 event.requestContext.identity.cognitoIdentityId 
                 ? event.requestContext.identity.cognitoIdentityId 
                 : "TEST-USER-ID";
                
  const noteId = event.pathParameters.id;
  
  try {
    // 1. First, get the note
    const getParams = {
      TableName: process.env.tableName,
      Key: {
        userId: userId,
        noteId: noteId
      }
    };
    
    const result = await dynamoDbLib.call("get", getParams);
    
    if (!result.Item) {
      return failure({ status: false, error: "Note not found" });
    }
    
    const note = result.Item;
    
    // 2. Enhance the note content with OpenAI
    const enhancedContent = await enhanceNote(note.content);
    
    // 3. Update the note with enhanced content
    const updateParams = {
      TableName: process.env.tableName,
      Key: {
        userId: userId,
        noteId: noteId
      },
      UpdateExpression: "SET enhancedContent = :enhancedContent",
      ExpressionAttributeValues: {
        ":enhancedContent": enhancedContent
      },
      ReturnValues: "ALL_NEW"
    };
    
    const updatedNote = await dynamoDbLib.call("update", updateParams);
    
    // 4. Return the enhanced note
    return success(updatedNote.Attributes);
  } catch (e) {
    console.error("Error enhancing note:", e);
    return failure({ status: false, error: e.message });
  }
} 