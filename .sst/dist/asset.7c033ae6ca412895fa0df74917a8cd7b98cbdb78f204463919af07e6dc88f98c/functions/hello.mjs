import { createRequire as topLevelCreateRequire } from 'module';
const require = topLevelCreateRequire(import.meta.url);
import { fileURLToPath as topLevelFileUrlToPath, URL as topLevelURL } from "url"
const __dirname = topLevelFileUrlToPath(new topLevelURL(".", import.meta.url))

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// functions/hello.ts
async function main() {
  return {
    statusCode: 200,
    body: "Hello from Lambda! \u{1F680}"
  };
}
__name(main, "main");
export {
  main
};
//# sourceMappingURL=hello.mjs.map
