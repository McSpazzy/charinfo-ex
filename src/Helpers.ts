export function getStringUTF16NullTerminated(data: DataView, offset: number, maxChars: number, littleEndian = true): string {
  const chars: number[] = [];

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
