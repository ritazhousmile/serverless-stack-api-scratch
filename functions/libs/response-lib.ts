export function success(body: any) {
  return buildResponse(200, body);
}

export function failure(body: any) {
  return buildResponse(500, body);
}

function buildResponse(statusCode: number, body: any) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
} 