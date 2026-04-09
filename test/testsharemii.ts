import fs from "fs";
import { CharInfoEx } from "../src/CharInfoEx";
const [, , ...args] = process.argv;

var path = args[0];

console.log("Reading", path);

var data = fs.readFileSync(path);
const byteData = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
var charData = CharInfoEx.FromShareMiiFileArrayBuffer(byteData);
console.log(charData);
