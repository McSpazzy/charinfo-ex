# charinfo-ex

** Parses TL:LTD CharInfoEx data **

## Example

### Read

From Save File
```js
import fs from 'fs';
import { CharInfoEx } from 'charinfo-ex';

var data = fs.readFileSync('./test/mii.sav');
var act = CharInfoEx.FromSaveFileArrayBuffer(data.buffer, 1);
console.log(act.toJson());
```


Special thanks to arian who gave me the hexpat to start off with.
