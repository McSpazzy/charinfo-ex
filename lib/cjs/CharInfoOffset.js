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

// src/CharInfoOffset.ts
var CharInfoOffset_exports = {};
__export(CharInfoOffset_exports, {
  CharInfoOffset: () => CharInfoOffset
});
module.exports = __toCommonJS(CharInfoOffset_exports);
var CharInfoOffset = /* @__PURE__ */ ((CharInfoOffset2) => {
  CharInfoOffset2[CharInfoOffset2["createId1"] = 0] = "createId1";
  CharInfoOffset2[CharInfoOffset2["createId2"] = 4] = "createId2";
  CharInfoOffset2[CharInfoOffset2["createId3"] = 8] = "createId3";
  CharInfoOffset2[CharInfoOffset2["createId4"] = 12] = "createId4";
  CharInfoOffset2[CharInfoOffset2["name"] = 16] = "name";
  CharInfoOffset2[CharInfoOffset2["fontRegion"] = 38] = "fontRegion";
  CharInfoOffset2[CharInfoOffset2["gender"] = 39] = "gender";
  CharInfoOffset2[CharInfoOffset2["height"] = 40] = "height";
  CharInfoOffset2[CharInfoOffset2["build"] = 41] = "build";
  CharInfoOffset2[CharInfoOffset2["regionMove"] = 42] = "regionMove";
  CharInfoOffset2[CharInfoOffset2["faceFlags"] = 43] = "faceFlags";
  CharInfoOffset2[CharInfoOffset2["facelineType"] = 44] = "facelineType";
  CharInfoOffset2[CharInfoOffset2["facelineColor"] = 45] = "facelineColor";
  CharInfoOffset2[CharInfoOffset2["wrinkleLower"] = 46] = "wrinkleLower";
  CharInfoOffset2[CharInfoOffset2["wrinkleLowerScale"] = 47] = "wrinkleLowerScale";
  CharInfoOffset2[CharInfoOffset2["wrinkleLowerAspect"] = 48] = "wrinkleLowerAspect";
  CharInfoOffset2[CharInfoOffset2["wrinkleLowerX"] = 49] = "wrinkleLowerX";
  CharInfoOffset2[CharInfoOffset2["wrinkleLowerY"] = 50] = "wrinkleLowerY";
  CharInfoOffset2[CharInfoOffset2["wrinkleUpper"] = 51] = "wrinkleUpper";
  CharInfoOffset2[CharInfoOffset2["wrinkleUpperScale"] = 52] = "wrinkleUpperScale";
  CharInfoOffset2[CharInfoOffset2["wrinkleUpperAspect"] = 53] = "wrinkleUpperAspect";
  CharInfoOffset2[CharInfoOffset2["wrinkleUpperX"] = 54] = "wrinkleUpperX";
  CharInfoOffset2[CharInfoOffset2["wrinkleUpperY"] = 55] = "wrinkleUpperY";
  CharInfoOffset2[CharInfoOffset2["makeup0"] = 56] = "makeup0";
  CharInfoOffset2[CharInfoOffset2["makeup0Color"] = 57] = "makeup0Color";
  CharInfoOffset2[CharInfoOffset2["makeup0Scale"] = 58] = "makeup0Scale";
  CharInfoOffset2[CharInfoOffset2["makeup0Aspect"] = 59] = "makeup0Aspect";
  CharInfoOffset2[CharInfoOffset2["makeup0X"] = 60] = "makeup0X";
  CharInfoOffset2[CharInfoOffset2["makeup0Y"] = 61] = "makeup0Y";
  CharInfoOffset2[CharInfoOffset2["makeup1"] = 62] = "makeup1";
  CharInfoOffset2[CharInfoOffset2["makeup1Color"] = 63] = "makeup1Color";
  CharInfoOffset2[CharInfoOffset2["makeup1Scale"] = 64] = "makeup1Scale";
  CharInfoOffset2[CharInfoOffset2["makeup1Aspect"] = 65] = "makeup1Aspect";
  CharInfoOffset2[CharInfoOffset2["makeup1X"] = 66] = "makeup1X";
  CharInfoOffset2[CharInfoOffset2["makeup1Y"] = 67] = "makeup1Y";
  CharInfoOffset2[CharInfoOffset2["hairType"] = 68] = "hairType";
  CharInfoOffset2[CharInfoOffset2["hairColor0"] = 70] = "hairColor0";
  CharInfoOffset2[CharInfoOffset2["hairColor1"] = 71] = "hairColor1";
  CharInfoOffset2[CharInfoOffset2["hairTypeFront"] = 72] = "hairTypeFront";
  CharInfoOffset2[CharInfoOffset2["hairTypeBack"] = 73] = "hairTypeBack";
  CharInfoOffset2[CharInfoOffset2["hairStyle"] = 74] = "hairStyle";
  CharInfoOffset2[CharInfoOffset2["earType"] = 75] = "earType";
  CharInfoOffset2[CharInfoOffset2["earScale"] = 76] = "earScale";
  CharInfoOffset2[CharInfoOffset2["earY"] = 77] = "earY";
  CharInfoOffset2[CharInfoOffset2["eyeType"] = 78] = "eyeType";
  CharInfoOffset2[CharInfoOffset2["eyeColor"] = 79] = "eyeColor";
  CharInfoOffset2[CharInfoOffset2["eyeScale"] = 80] = "eyeScale";
  CharInfoOffset2[CharInfoOffset2["eyeAspect"] = 81] = "eyeAspect";
  CharInfoOffset2[CharInfoOffset2["eyeRotate"] = 82] = "eyeRotate";
  CharInfoOffset2[CharInfoOffset2["eyeX"] = 83] = "eyeX";
  CharInfoOffset2[CharInfoOffset2["eyeY"] = 84] = "eyeY";
  CharInfoOffset2[CharInfoOffset2["eyeShadowColor"] = 85] = "eyeShadowColor";
  CharInfoOffset2[CharInfoOffset2["eyeHighlightType"] = 86] = "eyeHighlightType";
  CharInfoOffset2[CharInfoOffset2["eyeHighlightScale"] = 87] = "eyeHighlightScale";
  CharInfoOffset2[CharInfoOffset2["eyeHighlightAspect"] = 88] = "eyeHighlightAspect";
  CharInfoOffset2[CharInfoOffset2["eyeHighlightRotate"] = 89] = "eyeHighlightRotate";
  CharInfoOffset2[CharInfoOffset2["eyeHighlightX"] = 90] = "eyeHighlightX";
  CharInfoOffset2[CharInfoOffset2["eyeHighlightY"] = 91] = "eyeHighlightY";
  CharInfoOffset2[CharInfoOffset2["eyelashUpperType"] = 92] = "eyelashUpperType";
  CharInfoOffset2[CharInfoOffset2["eyelashUpperScale"] = 93] = "eyelashUpperScale";
  CharInfoOffset2[CharInfoOffset2["eyelashUpperAspect"] = 94] = "eyelashUpperAspect";
  CharInfoOffset2[CharInfoOffset2["eyelashUpperRotate"] = 95] = "eyelashUpperRotate";
  CharInfoOffset2[CharInfoOffset2["eyelashUpperX"] = 96] = "eyelashUpperX";
  CharInfoOffset2[CharInfoOffset2["eyelashUpperY"] = 97] = "eyelashUpperY";
  CharInfoOffset2[CharInfoOffset2["eyelashLowerType"] = 98] = "eyelashLowerType";
  CharInfoOffset2[CharInfoOffset2["eyelashLowerScale"] = 99] = "eyelashLowerScale";
  CharInfoOffset2[CharInfoOffset2["eyelashLowerAspect"] = 100] = "eyelashLowerAspect";
  CharInfoOffset2[CharInfoOffset2["eyelashLowerRotate"] = 101] = "eyelashLowerRotate";
  CharInfoOffset2[CharInfoOffset2["eyelashLowerX"] = 102] = "eyelashLowerX";
  CharInfoOffset2[CharInfoOffset2["eyelashLowerY"] = 103] = "eyelashLowerY";
  CharInfoOffset2[CharInfoOffset2["eyeLidUpperType"] = 104] = "eyeLidUpperType";
  CharInfoOffset2[CharInfoOffset2["eyeLidUpperScale"] = 105] = "eyeLidUpperScale";
  CharInfoOffset2[CharInfoOffset2["eyeLidUpperAspect"] = 106] = "eyeLidUpperAspect";
  CharInfoOffset2[CharInfoOffset2["eyeLidUpperRotate"] = 107] = "eyeLidUpperRotate";
  CharInfoOffset2[CharInfoOffset2["eyeLidUpperX"] = 108] = "eyeLidUpperX";
  CharInfoOffset2[CharInfoOffset2["eyeLidUpperY"] = 109] = "eyeLidUpperY";
  CharInfoOffset2[CharInfoOffset2["eyelidLowerType"] = 110] = "eyelidLowerType";
  CharInfoOffset2[CharInfoOffset2["eyelidLowerScale"] = 111] = "eyelidLowerScale";
  CharInfoOffset2[CharInfoOffset2["eyelidLowerAspect"] = 112] = "eyelidLowerAspect";
  CharInfoOffset2[CharInfoOffset2["eyelidLowerRotate"] = 113] = "eyelidLowerRotate";
  CharInfoOffset2[CharInfoOffset2["eyelidLowerX"] = 114] = "eyelidLowerX";
  CharInfoOffset2[CharInfoOffset2["eyelidLowerY"] = 115] = "eyelidLowerY";
  CharInfoOffset2[CharInfoOffset2["eyebrowType"] = 116] = "eyebrowType";
  CharInfoOffset2[CharInfoOffset2["eyebrowColor"] = 117] = "eyebrowColor";
  CharInfoOffset2[CharInfoOffset2["eyebrowScale"] = 118] = "eyebrowScale";
  CharInfoOffset2[CharInfoOffset2["eyebrowAspect"] = 119] = "eyebrowAspect";
  CharInfoOffset2[CharInfoOffset2["eyebrowRotate"] = 120] = "eyebrowRotate";
  CharInfoOffset2[CharInfoOffset2["eyebrowX"] = 121] = "eyebrowX";
  CharInfoOffset2[CharInfoOffset2["eyebrowY"] = 122] = "eyebrowY";
  CharInfoOffset2[CharInfoOffset2["noseType"] = 123] = "noseType";
  CharInfoOffset2[CharInfoOffset2["noseScale"] = 124] = "noseScale";
  CharInfoOffset2[CharInfoOffset2["noseY"] = 125] = "noseY";
  CharInfoOffset2[CharInfoOffset2["mouthType"] = 126] = "mouthType";
  CharInfoOffset2[CharInfoOffset2["mouthColor"] = 127] = "mouthColor";
  CharInfoOffset2[CharInfoOffset2["mouthScale"] = 128] = "mouthScale";
  CharInfoOffset2[CharInfoOffset2["mouthAspect"] = 129] = "mouthAspect";
  CharInfoOffset2[CharInfoOffset2["mouthRotate"] = 130] = "mouthRotate";
  CharInfoOffset2[CharInfoOffset2["mouthY"] = 131] = "mouthY";
  CharInfoOffset2[CharInfoOffset2["beardType"] = 132] = "beardType";
  CharInfoOffset2[CharInfoOffset2["beardColor"] = 133] = "beardColor";
  CharInfoOffset2[CharInfoOffset2["beardShortType"] = 134] = "beardShortType";
  CharInfoOffset2[CharInfoOffset2["beardShortColor"] = 135] = "beardShortColor";
  CharInfoOffset2[CharInfoOffset2["mustacheType"] = 136] = "mustacheType";
  CharInfoOffset2[CharInfoOffset2["mustacheColor"] = 137] = "mustacheColor";
  CharInfoOffset2[CharInfoOffset2["mustacheScale"] = 138] = "mustacheScale";
  CharInfoOffset2[CharInfoOffset2["mustacheAspect"] = 139] = "mustacheAspect";
  CharInfoOffset2[CharInfoOffset2["mustacheY"] = 140] = "mustacheY";
  CharInfoOffset2[CharInfoOffset2["glassType1"] = 141] = "glassType1";
  CharInfoOffset2[CharInfoOffset2["glassColor1"] = 142] = "glassColor1";
  CharInfoOffset2[CharInfoOffset2["glassScale"] = 143] = "glassScale";
  CharInfoOffset2[CharInfoOffset2["glassAspect"] = 144] = "glassAspect";
  CharInfoOffset2[CharInfoOffset2["glassY"] = 145] = "glassY";
  CharInfoOffset2[CharInfoOffset2["glassType2"] = 146] = "glassType2";
  CharInfoOffset2[CharInfoOffset2["glassColor2"] = 147] = "glassColor2";
  CharInfoOffset2[CharInfoOffset2["moleScale"] = 148] = "moleScale";
  CharInfoOffset2[CharInfoOffset2["moleX"] = 149] = "moleX";
  CharInfoOffset2[CharInfoOffset2["moleY"] = 150] = "moleY";
  CharInfoOffset2[CharInfoOffset2["unkDefault45"] = 151] = "unkDefault45";
  return CharInfoOffset2;
})(CharInfoOffset || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CharInfoOffset
});
