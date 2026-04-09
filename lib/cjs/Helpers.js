"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Helpers.ts
var Helpers_exports = {};
__export(Helpers_exports, {
  getStringUTF16NullTerminated: () => getStringUTF16NullTerminated
});
module.exports = __toCommonJS(Helpers_exports);
function getStringUTF16NullTerminated(data, offset, maxChars, littleEndian = true) {
  const chars = [];
  for (let i = 0; i < maxChars; i++) {
    const codeUnit = data.getUint16(offset, littleEndian);
    offset += 2;
    if (codeUnit === 0) {
      offset += (maxChars - i - 1) * 2;
      break;
    }
    chars.push(codeUnit);
  }
  return String.fromCharCode(...chars);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getStringUTF16NullTerminated
});
