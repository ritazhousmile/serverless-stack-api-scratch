import { createRequire as topLevelCreateRequire } from 'module';
const require = topLevelCreateRequire(import.meta.url);
import { fileURLToPath as topLevelFileUrlToPath, URL as topLevelURL } from "url"
const __dirname = topLevelFileUrlToPath(new topLevelURL(".", import.meta.url))

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// functions/debug.ts
async function main(event) {
  console.log("\u{1F4E5} Event received:", JSON.stringify(event));
  const response = {
    message: "This is a log-enabled function!",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    path: event?.rawPath
  };
  console.log("\u{1F4E4} Response:", response);
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
}
__name(main, "main");
export {
  main
};
//# sourceMappingURL=debug.mjs.map
