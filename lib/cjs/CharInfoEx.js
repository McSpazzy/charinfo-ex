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

// src/CharInfoEx.ts
var CharInfoEx_exports = {};
__export(CharInfoEx_exports, {
  CharInfoEx: () => CharInfoEx
});
module.exports = __toCommonJS(CharInfoEx_exports);

// src/Helpers.ts
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

// src/CharInfoEx.ts
var CharInfoEx = class _CharInfoEx {
  constructor() {
  }
  static bytesToUuidV4(bytes) {
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  }
  static uuidV4ToBytes(uuid) {
    const out = new Uint8Array(16);
    const hex = (uuid || "").replace(/-/g, "").toLowerCase();
    if (!/^[0-9a-f]{32}$/.test(hex)) {
      return out;
    }
    for (let i = 0; i < 16; i++) {
      out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }
    return out;
  }
  static writeStringUTF16Fixed(data, offset, maxChars, value, littleEndian = true) {
    const text = value ?? "";
    for (let i = 0; i < maxChars; i++) {
      const codeUnit = i < text.length ? text.charCodeAt(i) : 0;
      data.setUint16(offset + i * 2, codeUnit, littleEndian);
    }
  }
  static FromShareMiiFileArrayBuffer(saveBuffer) {
    var data = new DataView(saveBuffer);
    let offset = 5;
    const len = data.getUint32(offset, true);
    offset += 4;
    const charInfo = _CharInfoEx.FromArrayBuffer(saveBuffer.slice(offset, offset + len));
    return charInfo;
  }
  static FromSaveFileArrayBuffer(saveBuffer, index = void 0) {
    var infoExHash = 2283577978;
    var data = new DataView(saveBuffer);
    var dataOffset = data.getUint32(8, true);
    var offset = 40;
    var exPosition = 0;
    while (offset < dataOffset) {
      var hash = data.getUint32(offset, true);
      offset += 4;
      var currentOffset = data.getUint32(offset, true);
      offset += 4;
      if (hash === infoExHash) {
        exPosition = currentOffset;
      }
    }
    var entryPositionCount = data.getUint32(exPosition, true);
    exPosition += 4;
    const charArray = [];
    for (let index2 = 0; index2 < entryPositionCount; index2++) {
      const len = data.getUint32(exPosition, true);
      exPosition += 4;
      const charInfo = _CharInfoEx.FromArrayBuffer(saveBuffer.slice(exPosition, exPosition + len));
      exPosition += len;
      charArray.push(charInfo);
    }
    if (!index) {
      return charArray;
    }
    if (Array.isArray(index)) {
      return index.map((v) => charArray[v - 1]);
    } else {
      return charArray[index - 1];
    }
  }
  static FromArrayLike(arrayLike) {
    var data = Uint8Array.from(arrayLike);
    return _CharInfoEx.FromArrayBuffer(data.buffer);
  }
  static FromArrayBuffer(buffer) {
    const charItem = new _CharInfoEx();
    const dataView = new DataView(buffer);
    const u8 = (offset) => dataView.getUint8(offset);
    const u16 = (offset) => dataView.getUint16(offset, true);
    const idBytes = new Uint8Array(buffer, 0 /* createId1 */, 16);
    charItem.uuidv4 = _CharInfoEx.bytesToUuidV4(idBytes);
    charItem.name = getStringUTF16NullTerminated(dataView, 16 /* name */, 11);
    charItem.fontRegion = u8(38 /* fontRegion */);
    charItem.gender = u8(39 /* gender */);
    charItem.height = u8(40 /* height */);
    charItem.build = u8(41 /* build */);
    charItem.regionMove = u8(42 /* regionMove */);
    charItem.faceFlags = u8(43 /* faceFlags */);
    charItem.facelineType = u8(44 /* facelineType */);
    charItem.facelineColor = u8(45 /* facelineColor */);
    charItem.wrinkleLowerType = u8(46 /* wrinkleLowerType */);
    charItem.wrinkleLowerScale = u8(47 /* wrinkleLowerScale */);
    charItem.wrinkleLowerAspect = u8(48 /* wrinkleLowerAspect */);
    charItem.wrinkleLowerX = u8(49 /* wrinkleLowerX */);
    charItem.wrinkleLowerY = u8(50 /* wrinkleLowerY */);
    charItem.wrinkleUpperType = u8(51 /* wrinkleUpperType */);
    charItem.wrinkleUpperScale = u8(52 /* wrinkleUpperScale */);
    charItem.wrinkleUpperAspect = u8(53 /* wrinkleUpperAspect */);
    charItem.wrinkleUpperX = u8(54 /* wrinkleUpperX */);
    charItem.wrinkleUpperY = u8(55 /* wrinkleUpperY */);
    charItem.makeup0 = u8(56 /* makeup0 */);
    charItem.makeup0Color = u8(57 /* makeup0Color */);
    charItem.makeup0Scale = u8(58 /* makeup0Scale */);
    charItem.makeup0Aspect = u8(59 /* makeup0Aspect */);
    charItem.makeup0X = u8(60 /* makeup0X */);
    charItem.makeup0Y = u8(61 /* makeup0Y */);
    charItem.makeup1 = u8(62 /* makeup1 */);
    charItem.makeup1Color = u8(63 /* makeup1Color */);
    charItem.makeup1Scale = u8(64 /* makeup1Scale */);
    charItem.makeup1Aspect = u8(65 /* makeup1Aspect */);
    charItem.makeup1X = u8(66 /* makeup1X */);
    charItem.makeup1Y = u8(67 /* makeup1Y */);
    charItem.hairType = u16(68 /* hairType */);
    charItem.hairColor0 = u8(70 /* hairColor0 */);
    charItem.hairColor1 = u8(71 /* hairColor1 */);
    charItem.hairTypeFront = u8(72 /* hairTypeFront */);
    charItem.hairTypeBack = u8(73 /* hairTypeBack */);
    charItem.hairStyle = u8(74 /* hairStyle */);
    charItem.earType = u8(75 /* earType */);
    charItem.earScale = u8(76 /* earScale */);
    charItem.earY = u8(77 /* earY */);
    charItem.eyeType = u8(78 /* eyeType */);
    charItem.eyeColor = u8(79 /* eyeColor */);
    charItem.eyeScale = u8(80 /* eyeScale */);
    charItem.eyeAspect = u8(81 /* eyeAspect */);
    charItem.eyeRotate = u8(82 /* eyeRotate */);
    charItem.eyeX = u8(83 /* eyeX */);
    charItem.eyeY = u8(84 /* eyeY */);
    charItem.eyeShadowColor = u8(85 /* eyeShadowColor */);
    charItem.eyeHighlightType = u8(86 /* eyeHighlightType */);
    charItem.eyeHighlightScale = u8(87 /* eyeHighlightScale */);
    charItem.eyeHighlightAspect = u8(88 /* eyeHighlightAspect */);
    charItem.eyeHighlightRotate = u8(89 /* eyeHighlightRotate */);
    charItem.eyeHighlightX = u8(90 /* eyeHighlightX */);
    charItem.eyeHighlightY = u8(91 /* eyeHighlightY */);
    charItem.eyelashUpperType = u8(92 /* eyelashUpperType */);
    charItem.eyelashUpperScale = u8(93 /* eyelashUpperScale */);
    charItem.eyelashUpperAspect = u8(94 /* eyelashUpperAspect */);
    charItem.eyelashUpperRotate = u8(95 /* eyelashUpperRotate */);
    charItem.eyelashUpperX = u8(96 /* eyelashUpperX */);
    charItem.eyelashUpperY = u8(97 /* eyelashUpperY */);
    charItem.eyelashLowerType = u8(98 /* eyelashLowerType */);
    charItem.eyelashLowerScale = u8(99 /* eyelashLowerScale */);
    charItem.eyelashLowerAspect = u8(100 /* eyelashLowerAspect */);
    charItem.eyelashLowerRotate = u8(101 /* eyelashLowerRotate */);
    charItem.eyelashLowerX = u8(102 /* eyelashLowerX */);
    charItem.eyelashLowerY = u8(103 /* eyelashLowerY */);
    charItem.eyelidUpperType = u8(104 /* eyelidUpperType */);
    charItem.eyelidUpperScale = u8(105 /* eyelidUpperScale */);
    charItem.eyelidUpperAspect = u8(106 /* eyelidUpperAspect */);
    charItem.eyelidUpperRotate = u8(107 /* eyelidUpperRotate */);
    charItem.eyelidUpperX = u8(108 /* eyelidUpperX */);
    charItem.eyelidUpperY = u8(109 /* eyelidUpperY */);
    charItem.eyelidLowerType = u8(110 /* eyelidLowerType */);
    charItem.eyelidLowerScale = u8(111 /* eyelidLowerScale */);
    charItem.eyelidLowerAspect = u8(112 /* eyelidLowerAspect */);
    charItem.eyelidLowerRotate = u8(113 /* eyelidLowerRotate */);
    charItem.eyelidLowerX = u8(114 /* eyelidLowerX */);
    charItem.eyelidLowerY = u8(115 /* eyelidLowerY */);
    charItem.eyebrowType = u8(116 /* eyebrowType */);
    charItem.eyebrowColor = u8(117 /* eyebrowColor */);
    charItem.eyebrowScale = u8(118 /* eyebrowScale */);
    charItem.eyebrowAspect = u8(119 /* eyebrowAspect */);
    charItem.eyebrowRotate = u8(120 /* eyebrowRotate */);
    charItem.eyebrowX = u8(121 /* eyebrowX */);
    charItem.eyebrowY = u8(122 /* eyebrowY */);
    charItem.noseType = u8(123 /* noseType */);
    charItem.noseScale = u8(124 /* noseScale */);
    charItem.noseY = u8(125 /* noseY */);
    charItem.mouthType = u8(126 /* mouthType */);
    charItem.mouthColor = u8(127 /* mouthColor */);
    charItem.mouthScale = u8(128 /* mouthScale */);
    charItem.mouthAspect = u8(129 /* mouthAspect */);
    charItem.mouthRotate = u8(130 /* mouthRotate */);
    charItem.mouthY = u8(131 /* mouthY */);
    charItem.beardType = u8(132 /* beardType */);
    charItem.beardColor = u8(133 /* beardColor */);
    charItem.beardShortType = u8(134 /* beardShortType */);
    charItem.beardShortColor = u8(135 /* beardShortColor */);
    charItem.mustacheType = u8(136 /* mustacheType */);
    charItem.mustacheColor = u8(137 /* mustacheColor */);
    charItem.mustacheScale = u8(138 /* mustacheScale */);
    charItem.mustacheAspect = u8(139 /* mustacheAspect */);
    charItem.mustacheY = u8(140 /* mustacheY */);
    charItem.glassType1 = u8(141 /* glassType1 */);
    charItem.glassColor1 = u8(142 /* glassColor1 */);
    charItem.glassScale = u8(143 /* glassScale */);
    charItem.glassAspect = u8(144 /* glassAspect */);
    charItem.glassY = u8(145 /* glassY */);
    charItem.glassType2 = u8(146 /* glassType2 */);
    charItem.glassColor2 = u8(147 /* glassColor2 */);
    charItem.moleScale = u8(148 /* moleScale */);
    charItem.moleX = u8(149 /* moleX */);
    charItem.moleY = u8(150 /* moleY */);
    charItem.unkDefault45 = u8(151 /* unkDefault45 */);
    return charItem;
  }
  ToArrayBuffer() {
    const buffer = new ArrayBuffer(152);
    const dataView = new DataView(buffer);
    const u8 = (offset, value) => dataView.setUint8(offset, value & 255);
    const u16 = (offset, value) => dataView.setUint16(offset, value & 65535, true);
    new Uint8Array(buffer, 0 /* createId1 */, 16).set(_CharInfoEx.uuidV4ToBytes(this.uuidv4));
    _CharInfoEx.writeStringUTF16Fixed(dataView, 16 /* name */, 11, this.name);
    u8(38 /* fontRegion */, this.fontRegion);
    u8(39 /* gender */, this.gender);
    u8(40 /* height */, this.height);
    u8(41 /* build */, this.build);
    u8(42 /* regionMove */, this.regionMove);
    u8(43 /* faceFlags */, this.faceFlags);
    u8(44 /* facelineType */, this.facelineType);
    u8(45 /* facelineColor */, this.facelineColor);
    u8(46 /* wrinkleLowerType */, this.wrinkleLowerType);
    u8(47 /* wrinkleLowerScale */, this.wrinkleLowerScale);
    u8(48 /* wrinkleLowerAspect */, this.wrinkleLowerAspect);
    u8(49 /* wrinkleLowerX */, this.wrinkleLowerX);
    u8(50 /* wrinkleLowerY */, this.wrinkleLowerY);
    u8(51 /* wrinkleUpperType */, this.wrinkleUpperType);
    u8(52 /* wrinkleUpperScale */, this.wrinkleUpperScale);
    u8(53 /* wrinkleUpperAspect */, this.wrinkleUpperAspect);
    u8(54 /* wrinkleUpperX */, this.wrinkleUpperX);
    u8(55 /* wrinkleUpperY */, this.wrinkleUpperY);
    u8(56 /* makeup0 */, this.makeup0);
    u8(57 /* makeup0Color */, this.makeup0Color);
    u8(58 /* makeup0Scale */, this.makeup0Scale);
    u8(59 /* makeup0Aspect */, this.makeup0Aspect);
    u8(60 /* makeup0X */, this.makeup0X);
    u8(61 /* makeup0Y */, this.makeup0Y);
    u8(62 /* makeup1 */, this.makeup1);
    u8(63 /* makeup1Color */, this.makeup1Color);
    u8(64 /* makeup1Scale */, this.makeup1Scale);
    u8(65 /* makeup1Aspect */, this.makeup1Aspect);
    u8(66 /* makeup1X */, this.makeup1X);
    u8(67 /* makeup1Y */, this.makeup1Y);
    u16(68 /* hairType */, this.hairType);
    u8(70 /* hairColor0 */, this.hairColor0);
    u8(71 /* hairColor1 */, this.hairColor1);
    u8(72 /* hairTypeFront */, this.hairTypeFront);
    u8(73 /* hairTypeBack */, this.hairTypeBack);
    u8(74 /* hairStyle */, this.hairStyle);
    u8(75 /* earType */, this.earType);
    u8(76 /* earScale */, this.earScale);
    u8(77 /* earY */, this.earY);
    u8(78 /* eyeType */, this.eyeType);
    u8(79 /* eyeColor */, this.eyeColor);
    u8(80 /* eyeScale */, this.eyeScale);
    u8(81 /* eyeAspect */, this.eyeAspect);
    u8(82 /* eyeRotate */, this.eyeRotate);
    u8(83 /* eyeX */, this.eyeX);
    u8(84 /* eyeY */, this.eyeY);
    u8(85 /* eyeShadowColor */, this.eyeShadowColor);
    u8(86 /* eyeHighlightType */, this.eyeHighlightType);
    u8(87 /* eyeHighlightScale */, this.eyeHighlightScale);
    u8(88 /* eyeHighlightAspect */, this.eyeHighlightAspect);
    u8(89 /* eyeHighlightRotate */, this.eyeHighlightRotate);
    u8(90 /* eyeHighlightX */, this.eyeHighlightX);
    u8(91 /* eyeHighlightY */, this.eyeHighlightY);
    u8(92 /* eyelashUpperType */, this.eyelashUpperType);
    u8(93 /* eyelashUpperScale */, this.eyelashUpperScale);
    u8(94 /* eyelashUpperAspect */, this.eyelashUpperAspect);
    u8(95 /* eyelashUpperRotate */, this.eyelashUpperRotate);
    u8(96 /* eyelashUpperX */, this.eyelashUpperX);
    u8(97 /* eyelashUpperY */, this.eyelashUpperY);
    u8(98 /* eyelashLowerType */, this.eyelashLowerType);
    u8(99 /* eyelashLowerScale */, this.eyelashLowerScale);
    u8(100 /* eyelashLowerAspect */, this.eyelashLowerAspect);
    u8(101 /* eyelashLowerRotate */, this.eyelashLowerRotate);
    u8(102 /* eyelashLowerX */, this.eyelashLowerX);
    u8(103 /* eyelashLowerY */, this.eyelashLowerY);
    u8(104 /* eyelidUpperType */, this.eyelidUpperType);
    u8(105 /* eyelidUpperScale */, this.eyelidUpperScale);
    u8(106 /* eyelidUpperAspect */, this.eyelidUpperAspect);
    u8(107 /* eyelidUpperRotate */, this.eyelidUpperRotate);
    u8(108 /* eyelidUpperX */, this.eyelidUpperX);
    u8(109 /* eyelidUpperY */, this.eyelidUpperY);
    u8(110 /* eyelidLowerType */, this.eyelidLowerType);
    u8(111 /* eyelidLowerScale */, this.eyelidLowerScale);
    u8(112 /* eyelidLowerAspect */, this.eyelidLowerAspect);
    u8(113 /* eyelidLowerRotate */, this.eyelidLowerRotate);
    u8(114 /* eyelidLowerX */, this.eyelidLowerX);
    u8(115 /* eyelidLowerY */, this.eyelidLowerY);
    u8(116 /* eyebrowType */, this.eyebrowType);
    u8(117 /* eyebrowColor */, this.eyebrowColor);
    u8(118 /* eyebrowScale */, this.eyebrowScale);
    u8(119 /* eyebrowAspect */, this.eyebrowAspect);
    u8(120 /* eyebrowRotate */, this.eyebrowRotate);
    u8(121 /* eyebrowX */, this.eyebrowX);
    u8(122 /* eyebrowY */, this.eyebrowY);
    u8(123 /* noseType */, this.noseType);
    u8(124 /* noseScale */, this.noseScale);
    u8(125 /* noseY */, this.noseY);
    u8(126 /* mouthType */, this.mouthType);
    u8(127 /* mouthColor */, this.mouthColor);
    u8(128 /* mouthScale */, this.mouthScale);
    u8(129 /* mouthAspect */, this.mouthAspect);
    u8(130 /* mouthRotate */, this.mouthRotate);
    u8(131 /* mouthY */, this.mouthY);
    u8(132 /* beardType */, this.beardType);
    u8(133 /* beardColor */, this.beardColor);
    u8(134 /* beardShortType */, this.beardShortType);
    u8(135 /* beardShortColor */, this.beardShortColor);
    u8(136 /* mustacheType */, this.mustacheType);
    u8(137 /* mustacheColor */, this.mustacheColor);
    u8(138 /* mustacheScale */, this.mustacheScale);
    u8(139 /* mustacheAspect */, this.mustacheAspect);
    u8(140 /* mustacheY */, this.mustacheY);
    u8(141 /* glassType1 */, this.glassType1);
    u8(142 /* glassColor1 */, this.glassColor1);
    u8(143 /* glassScale */, this.glassScale);
    u8(144 /* glassAspect */, this.glassAspect);
    u8(145 /* glassY */, this.glassY);
    u8(146 /* glassType2 */, this.glassType2);
    u8(147 /* glassColor2 */, this.glassColor2);
    u8(148 /* moleScale */, this.moleScale);
    u8(149 /* moleX */, this.moleX);
    u8(150 /* moleY */, this.moleY);
    u8(151 /* unkDefault45 */, this.unkDefault45);
    return buffer;
  }
  static ToArrayBuffer(charInfo) {
    return charInfo.ToArrayBuffer();
  }
  toJson(pretty = true) {
    if (pretty) {
      return JSON.stringify(this, null, 4);
    } else {
      return JSON.stringify(this);
    }
  }
  static fromJson(jsonString) {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => Object.assign(new _CharInfoEx(), item));
    }
    return Object.assign(new _CharInfoEx(), parsed);
  }
  uuidv4 = "";
  name = "";
  // utf16 - 11 char
  fontRegion = 0;
  gender = 0;
  // u8
  height = 0;
  // u8
  build = 0;
  // u8
  regionMove = 0;
  // u8
  faceFlags = 0;
  // u8
  facelineType = 0;
  // u8
  facelineColor = 0;
  // u8
  wrinkleLowerType = 0;
  // u8
  wrinkleLowerScale = 0;
  // u8
  wrinkleLowerAspect = 0;
  // u8
  wrinkleLowerX = 0;
  // u8
  wrinkleLowerY = 0;
  // u8
  wrinkleUpperType = 0;
  // u8
  wrinkleUpperScale = 0;
  // u8
  wrinkleUpperAspect = 0;
  // u8
  wrinkleUpperX = 0;
  // u8
  wrinkleUpperY = 0;
  // u8
  makeup0 = 0;
  // u8
  makeup0Color = 0;
  // u8
  makeup0Scale = 0;
  // u8
  makeup0Aspect = 0;
  // u8
  makeup0X = 0;
  // u8
  makeup0Y = 0;
  // u8
  makeup1 = 0;
  // u8
  makeup1Color = 0;
  // u8
  makeup1Scale = 0;
  // u8
  makeup1Aspect = 0;
  // u8
  makeup1X = 0;
  // u8
  makeup1Y = 0;
  // u8
  hairType = 0;
  // u16
  hairColor0 = 0;
  // u8
  hairColor1 = 0;
  // u8
  hairTypeFront = 0;
  // u8
  hairTypeBack = 0;
  // u8
  hairStyle = 0;
  // u8
  earType = 0;
  // u8
  earScale = 0;
  // u8
  earY = 0;
  // u8
  eyeType = 0;
  // u8
  eyeColor = 0;
  // u8
  eyeScale = 0;
  // u8
  eyeAspect = 0;
  // u8
  eyeRotate = 0;
  // u8
  eyeX = 0;
  // u8
  eyeY = 0;
  // u8
  eyeShadowColor = 0;
  // u8
  eyeHighlightType = 0;
  // u8
  eyeHighlightScale = 0;
  // u8
  eyeHighlightAspect = 0;
  // u8
  eyeHighlightRotate = 0;
  // u8
  eyeHighlightX = 0;
  // u8
  eyeHighlightY = 0;
  // u8
  eyelashUpperType = 0;
  // u8
  eyelashUpperScale = 0;
  // u8
  eyelashUpperAspect = 0;
  // u8
  eyelashUpperRotate = 0;
  // u8
  eyelashUpperX = 0;
  // u8
  eyelashUpperY = 0;
  // u8
  eyelashLowerType = 0;
  // u8
  eyelashLowerScale = 0;
  // u8
  eyelashLowerAspect = 0;
  // u8
  eyelashLowerRotate = 0;
  // u8
  eyelashLowerX = 0;
  // u8
  eyelashLowerY = 0;
  // u8
  eyelidUpperType = 0;
  // u8
  eyelidUpperScale = 0;
  // u8
  eyelidUpperAspect = 0;
  // u8
  eyelidUpperRotate = 0;
  // u8
  eyelidUpperX = 0;
  // u8
  eyelidUpperY = 0;
  // u8
  eyelidLowerType = 0;
  // u8
  eyelidLowerScale = 0;
  // u8
  eyelidLowerAspect = 0;
  // u8
  eyelidLowerRotate = 0;
  // u8
  eyelidLowerX = 0;
  // u8
  eyelidLowerY = 0;
  // u8
  eyebrowType = 0;
  // u8
  eyebrowColor = 0;
  // u8
  eyebrowScale = 0;
  // u8
  eyebrowAspect = 0;
  // u8
  eyebrowRotate = 0;
  // u8
  eyebrowX = 0;
  // u8
  eyebrowY = 0;
  // u8
  noseType = 0;
  // u8
  noseScale = 0;
  // u8
  noseY = 0;
  // u8
  mouthType = 0;
  // u8
  mouthColor = 0;
  // u8
  mouthScale = 0;
  // u8
  mouthAspect = 0;
  // u8
  mouthRotate = 0;
  // u8
  mouthY = 0;
  // u8
  beardType = 0;
  // u8
  beardColor = 0;
  // u8
  beardShortType = 0;
  // u8
  beardShortColor = 0;
  // u8
  mustacheType = 0;
  // u8
  mustacheColor = 0;
  // u8
  mustacheScale = 0;
  // u8
  mustacheAspect = 0;
  // u8
  mustacheY = 0;
  // u8
  glassType1 = 0;
  // u8
  glassColor1 = 0;
  // u8
  glassScale = 0;
  // u8
  glassAspect = 0;
  // u8
  glassY = 0;
  // u8
  glassType2 = 0;
  // u8
  glassColor2 = 0;
  // u8
  moleScale = 0;
  // u8
  moleX = 0;
  // u8
  moleY = 0;
  // u8
  unkDefault45 = 0;
  // u8
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CharInfoEx
});
