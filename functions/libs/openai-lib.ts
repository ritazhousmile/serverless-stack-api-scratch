import { Configuration, OpenAIApi } from "openai";

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export async function enhanceNote(noteContent: string): Promise<string> {
  try {
    const prompt = `Please enhance the following note with additional insights, suggestions, or related information:\n\n${noteContent}\n\nEnhanced version:`;
    
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1024,
      temperature: 0.7,
    });

    return completion.data.choices[0]?.text?.trim() || "No enhancement available";
  } catch (error) {
    console.error("Error enhancing note with OpenAI:", error);
    throw error;
  }
} 