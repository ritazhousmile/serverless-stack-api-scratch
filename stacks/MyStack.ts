import { StackContext, Api, Table, Config } from "sst/constructs";

export function MyStack({ stack }: StackContext) {
  // Create a DynamoDB table
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" }
  });

  // Create the Stripe secret environment parameter
  const stripeSecretKey = new Config.Secret(stack, "STRIPE_SECRET_KEY");

  const api = new Api(stack, "Api", {
    cors: {
      allowOrigins: ["*"],
      allowMethods: ["ANY"],
      allowHeaders: ["*"]
    },
    defaults: {
      function: {
        runtime: "nodejs18.x",
        environment: {
          tableName: table.tableName
        },
        permissions: [table]
      },
    },
    routes: {
      "GET /hello": "functions/hello.main",
      "GET /debug": "functions/debug.main",
      "POST /notes": "functions/create.main",
      "GET /notes": "functions/list.main",
      "GET /notes/{id}": "functions/get.main",
      "DELETE /notes/{id}": "functions/delete.main",
      "POST /billing": {
        function: {
          handler: "functions/billing.main",
          bind: [stripeSecretKey]
        }
      }
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    NotesTableName: table.tableName,
  });
}
