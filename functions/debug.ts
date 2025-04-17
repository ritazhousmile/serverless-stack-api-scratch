export async function main(event: any) {
  console.log("📥 Event received:", JSON.stringify(event));

  const response = {
    message: "This is a log-enabled function!",
    timestamp: new Date().toISOString(),
    path: event?.rawPath,
  };

  console.log("📤 Response:", response);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
} 