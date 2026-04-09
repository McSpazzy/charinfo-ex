import fs from 'fs';
import { CharInfoEx } from '../src/CharInfoEx';
const [, , ...args] = process.argv;


var path = args[0];
var pathOut = args[1];

console.log('Reading', path);

var data = fs.readFileSync(path);
var charData = CharInfoEx.FromSaveFileArrayBuffer(data.buffer, 1);

console.log(charData.toJson())

if (pathOut) {
    fs.writeFileSync(pathOut, JSON.stringify(charData, null, 2));
}
