import { SSTConfig } from "sst";
import { MyStack } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "serverless-stack-api",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(MyStack);
  }
} satisfies SSTConfig;
