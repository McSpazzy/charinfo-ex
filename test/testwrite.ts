import fs from "fs";
import { CharInfoEx } from "../src/CharInfoEx";
const [, , ...args] = process.argv;

var path = args[0];

console.log("Reading", path);

var jsonString = fs.readFileSync(path, "utf8");
var charData = CharInfoEx.fromJson(jsonString);

if (Array.isArray(charData)) {
  console.log(charData.map((v) => v).join("\n"));
} else {
  console.log(charData);
}
