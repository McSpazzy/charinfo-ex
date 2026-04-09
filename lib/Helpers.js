"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringUTF16NullTerminated = getStringUTF16NullTerminated;
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
