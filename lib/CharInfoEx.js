"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharInfoEx = void 0;
const CharInfoOffset_1 = require("./CharInfoOffset");
const Helpers_1 = require("./Helpers");
class CharInfoEx {
    constructor() { }
    static bytesToUuidV4(bytes) {
        const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
    }
    static FromSaveFileArrayBuffer(saveBuffer, index = undefined) {
        var infoExHash = 2283577978;
        var data = new DataView(saveBuffer);
        var dataOffset = data.getUint32(0x8, true);
        var offset = 0x28;
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
        for (let index = 0; index < entryPositionCount; index++) {
            const len = data.getUint32(exPosition, true);
            exPosition += 4;
            const charInfo = CharInfoEx.FromArrayBuffer(saveBuffer.slice(exPosition, exPosition + len));
            exPosition += len;
            charArray.push(charInfo);
        }
        if (!index) {
            return charArray;
        }
        if (Array.isArray(index)) {
            return index.map((v) => charArray[v - 1]);
        }
        else {
            return charArray[index - 1];
        }
    }
    static FromArrayLike(arrayLike) {
        var data = Uint8Array.from(arrayLike);
        return CharInfoEx.FromArrayBuffer(data.buffer);
    }
    static FromArrayBuffer(buffer) {
        const charItem = new CharInfoEx();
        const dataView = new DataView(buffer);
        const u8 = (offset) => dataView.getUint8(offset);
        const u16 = (offset) => dataView.getUint16(offset, true);
        const idBytes = new Uint8Array(buffer, CharInfoOffset_1.CharInfoOffset.createId1, 16);
        charItem.uuidv4 = CharInfoEx.bytesToUuidV4(idBytes);
        charItem.name = (0, Helpers_1.getStringUTF16NullTerminated)(dataView, CharInfoOffset_1.CharInfoOffset.name, 11);
        charItem.fontRegion = u8(CharInfoOffset_1.CharInfoOffset.fontRegion);
        charItem.gender = u8(CharInfoOffset_1.CharInfoOffset.gender);
        charItem.height = u8(CharInfoOffset_1.CharInfoOffset.height);
        charItem.build = u8(CharInfoOffset_1.CharInfoOffset.build);
        charItem.regionMove = u8(CharInfoOffset_1.CharInfoOffset.regionMove);
        charItem.faceFlags = u8(CharInfoOffset_1.CharInfoOffset.faceFlags);
        charItem.facelineType = u8(CharInfoOffset_1.CharInfoOffset.facelineType);
        charItem.facelineColor = u8(CharInfoOffset_1.CharInfoOffset.facelineColor);
        charItem.wrinkleLower = u8(CharInfoOffset_1.CharInfoOffset.wrinkleLower);
        charItem.wrinkleLowerScale = u8(CharInfoOffset_1.CharInfoOffset.wrinkleLowerScale);
        charItem.wrinkleLowerAspect = u8(CharInfoOffset_1.CharInfoOffset.wrinkleLowerAspect);
        charItem.wrinkleLowerX = u8(CharInfoOffset_1.CharInfoOffset.wrinkleLowerX);
        charItem.wrinkleLowerY = u8(CharInfoOffset_1.CharInfoOffset.wrinkleLowerY);
        charItem.wrinkleUpper = u8(CharInfoOffset_1.CharInfoOffset.wrinkleUpper);
        charItem.wrinkleUpperScale = u8(CharInfoOffset_1.CharInfoOffset.wrinkleUpperScale);
        charItem.wrinkleUpperAspect = u8(CharInfoOffset_1.CharInfoOffset.wrinkleUpperAspect);
        charItem.wrinkleUpperX = u8(CharInfoOffset_1.CharInfoOffset.wrinkleUpperX);
        charItem.wrinkleUpperY = u8(CharInfoOffset_1.CharInfoOffset.wrinkleUpperY);
        charItem.makeup0 = u8(CharInfoOffset_1.CharInfoOffset.makeup0);
        charItem.makeup0Color = u8(CharInfoOffset_1.CharInfoOffset.makeup0Color);
        charItem.makeup0Scale = u8(CharInfoOffset_1.CharInfoOffset.makeup0Scale);
        charItem.makeup0Aspect = u8(CharInfoOffset_1.CharInfoOffset.makeup0Aspect);
        charItem.makeup0X = u8(CharInfoOffset_1.CharInfoOffset.makeup0X);
        charItem.makeup0Y = u8(CharInfoOffset_1.CharInfoOffset.makeup0Y);
        charItem.makeup1 = u8(CharInfoOffset_1.CharInfoOffset.makeup1);
        charItem.makeup1Color = u8(CharInfoOffset_1.CharInfoOffset.makeup1Color);
        charItem.makeup1Scale = u8(CharInfoOffset_1.CharInfoOffset.makeup1Scale);
        charItem.makeup1Aspect = u8(CharInfoOffset_1.CharInfoOffset.makeup1Aspect);
        charItem.makeup1X = u8(CharInfoOffset_1.CharInfoOffset.makeup1X);
        charItem.makeup1Y = u8(CharInfoOffset_1.CharInfoOffset.makeup1Y);
        charItem.hairType = u16(CharInfoOffset_1.CharInfoOffset.hairType);
        charItem.hairColor0 = u8(CharInfoOffset_1.CharInfoOffset.hairColor0);
        charItem.hairColor1 = u8(CharInfoOffset_1.CharInfoOffset.hairColor1);
        charItem.hairTypeFront = u8(CharInfoOffset_1.CharInfoOffset.hairTypeFront);
        charItem.hairTypeBack = u8(CharInfoOffset_1.CharInfoOffset.hairTypeBack);
        charItem.hairStyle = u8(CharInfoOffset_1.CharInfoOffset.hairStyle);
        charItem.earType = u8(CharInfoOffset_1.CharInfoOffset.earType);
        charItem.earScale = u8(CharInfoOffset_1.CharInfoOffset.earScale);
        charItem.earY = u8(CharInfoOffset_1.CharInfoOffset.earY);
        charItem.eyeType = u8(CharInfoOffset_1.CharInfoOffset.eyeType);
        charItem.eyeColor = u8(CharInfoOffset_1.CharInfoOffset.eyeColor);
        charItem.eyeScale = u8(CharInfoOffset_1.CharInfoOffset.eyeScale);
        charItem.eyeAspect = u8(CharInfoOffset_1.CharInfoOffset.eyeAspect);
        charItem.eyeRotate = u8(CharInfoOffset_1.CharInfoOffset.eyeRotate);
        charItem.eyeX = u8(CharInfoOffset_1.CharInfoOffset.eyeX);
        charItem.eyeY = u8(CharInfoOffset_1.CharInfoOffset.eyeY);
        charItem.eyeShadowColor = u8(CharInfoOffset_1.CharInfoOffset.eyeShadowColor);
        charItem.eyeHighlightType = u8(CharInfoOffset_1.CharInfoOffset.eyeHighlightType);
        charItem.eyeHighlightScale = u8(CharInfoOffset_1.CharInfoOffset.eyeHighlightScale);
        charItem.eyeHighlightAspect = u8(CharInfoOffset_1.CharInfoOffset.eyeHighlightAspect);
        charItem.eyeHighlightRotate = u8(CharInfoOffset_1.CharInfoOffset.eyeHighlightRotate);
        charItem.eyeHighlightX = u8(CharInfoOffset_1.CharInfoOffset.eyeHighlightX);
        charItem.eyeHighlightY = u8(CharInfoOffset_1.CharInfoOffset.eyeHighlightY);
        charItem.eyelashUpperType = u8(CharInfoOffset_1.CharInfoOffset.eyelashUpperType);
        charItem.eyelashUpperScale = u8(CharInfoOffset_1.CharInfoOffset.eyelashUpperScale);
        charItem.eyelashUpperAspect = u8(CharInfoOffset_1.CharInfoOffset.eyelashUpperAspect);
        charItem.eyelashUpperRotate = u8(CharInfoOffset_1.CharInfoOffset.eyelashUpperRotate);
        charItem.eyelashUpperX = u8(CharInfoOffset_1.CharInfoOffset.eyelashUpperX);
        charItem.eyelashUpperY = u8(CharInfoOffset_1.CharInfoOffset.eyelashUpperY);
        charItem.eyelashLowerType = u8(CharInfoOffset_1.CharInfoOffset.eyelashLowerType);
        charItem.eyelashLowerScale = u8(CharInfoOffset_1.CharInfoOffset.eyelashLowerScale);
        charItem.eyelashLowerAspect = u8(CharInfoOffset_1.CharInfoOffset.eyelashLowerAspect);
        charItem.eyelashLowerRotate = u8(CharInfoOffset_1.CharInfoOffset.eyelashLowerRotate);
        charItem.eyelashLowerX = u8(CharInfoOffset_1.CharInfoOffset.eyelashLowerX);
        charItem.eyelashLowerY = u8(CharInfoOffset_1.CharInfoOffset.eyelashLowerY);
        charItem.eyeLidUpperType = u8(CharInfoOffset_1.CharInfoOffset.eyeLidUpperType);
        charItem.eyeLidUpperScale = u8(CharInfoOffset_1.CharInfoOffset.eyeLidUpperScale);
        charItem.eyeLidUpperAspect = u8(CharInfoOffset_1.CharInfoOffset.eyeLidUpperAspect);
        charItem.eyeLidUpperRotate = u8(CharInfoOffset_1.CharInfoOffset.eyeLidUpperRotate);
        charItem.eyeLidUpperX = u8(CharInfoOffset_1.CharInfoOffset.eyeLidUpperX);
        charItem.eyeLidUpperY = u8(CharInfoOffset_1.CharInfoOffset.eyeLidUpperY);
        charItem.eyelidLowerType = u8(CharInfoOffset_1.CharInfoOffset.eyelidLowerType);
        charItem.eyelidLowerScale = u8(CharInfoOffset_1.CharInfoOffset.eyelidLowerScale);
        charItem.eyelidLowerAspect = u8(CharInfoOffset_1.CharInfoOffset.eyelidLowerAspect);
        charItem.eyelidLowerRotate = u8(CharInfoOffset_1.CharInfoOffset.eyelidLowerRotate);
        charItem.eyelidLowerX = u8(CharInfoOffset_1.CharInfoOffset.eyelidLowerX);
        charItem.eyelidLowerY = u8(CharInfoOffset_1.CharInfoOffset.eyelidLowerY);
        charItem.eyebrowType = u8(CharInfoOffset_1.CharInfoOffset.eyebrowType);
        charItem.eyebrowColor = u8(CharInfoOffset_1.CharInfoOffset.eyebrowColor);
        charItem.eyebrowScale = u8(CharInfoOffset_1.CharInfoOffset.eyebrowScale);
        charItem.eyebrowAspect = u8(CharInfoOffset_1.CharInfoOffset.eyebrowAspect);
        charItem.eyebrowRotate = u8(CharInfoOffset_1.CharInfoOffset.eyebrowRotate);
        charItem.eyebrowX = u8(CharInfoOffset_1.CharInfoOffset.eyebrowX);
        charItem.eyebrowY = u8(CharInfoOffset_1.CharInfoOffset.eyebrowY);
        charItem.noseType = u8(CharInfoOffset_1.CharInfoOffset.noseType);
        charItem.noseScale = u8(CharInfoOffset_1.CharInfoOffset.noseScale);
        charItem.noseY = u8(CharInfoOffset_1.CharInfoOffset.noseY);
        charItem.mouthType = u8(CharInfoOffset_1.CharInfoOffset.mouthType);
        charItem.mouthColor = u8(CharInfoOffset_1.CharInfoOffset.mouthColor);
        charItem.mouthScale = u8(CharInfoOffset_1.CharInfoOffset.mouthScale);
        charItem.mouthAspect = u8(CharInfoOffset_1.CharInfoOffset.mouthAspect);
        charItem.mouthRotate = u8(CharInfoOffset_1.CharInfoOffset.mouthRotate);
        charItem.mouthY = u8(CharInfoOffset_1.CharInfoOffset.mouthY);
        charItem.beardType = u8(CharInfoOffset_1.CharInfoOffset.beardType);
        charItem.beardColor = u8(CharInfoOffset_1.CharInfoOffset.beardColor);
        charItem.beardShortType = u8(CharInfoOffset_1.CharInfoOffset.beardShortType);
        charItem.beardShortColor = u8(CharInfoOffset_1.CharInfoOffset.beardShortColor);
        charItem.mustacheType = u8(CharInfoOffset_1.CharInfoOffset.mustacheType);
        charItem.mustacheColor = u8(CharInfoOffset_1.CharInfoOffset.mustacheColor);
        charItem.mustacheScale = u8(CharInfoOffset_1.CharInfoOffset.mustacheScale);
        charItem.mustacheAspect = u8(CharInfoOffset_1.CharInfoOffset.mustacheAspect);
        charItem.mustacheY = u8(CharInfoOffset_1.CharInfoOffset.mustacheY);
        charItem.glassType1 = u8(CharInfoOffset_1.CharInfoOffset.glassType1);
        charItem.glassColor1 = u8(CharInfoOffset_1.CharInfoOffset.glassColor1);
        charItem.glassScale = u8(CharInfoOffset_1.CharInfoOffset.glassScale);
        charItem.glassAspect = u8(CharInfoOffset_1.CharInfoOffset.glassAspect);
        charItem.glassY = u8(CharInfoOffset_1.CharInfoOffset.glassY);
        charItem.glassType2 = u8(CharInfoOffset_1.CharInfoOffset.glassType2);
        charItem.glassColor2 = u8(CharInfoOffset_1.CharInfoOffset.glassColor2);
        charItem.moleScale = u8(CharInfoOffset_1.CharInfoOffset.moleScale);
        charItem.moleX = u8(CharInfoOffset_1.CharInfoOffset.moleX);
        charItem.moleY = u8(CharInfoOffset_1.CharInfoOffset.moleY);
        charItem.unkDefault45 = u8(CharInfoOffset_1.CharInfoOffset.unkDefault45);
        return charItem;
    }
    toJson(pretty = true) {
        if (pretty) {
            return JSON.stringify(this, null, 4);
        }
        else {
            return JSON.stringify(this);
        }
    }
    uuidv4 = "";
    name = ""; // utf16 - 11 char
    fontRegion = 0;
    gender = 0; // u8
    height = 0; // u8
    build = 0; // u8
    regionMove = 0; // u8
    faceFlags = 0; // u8
    facelineType = 0; // u8
    facelineColor = 0; // u8
    wrinkleLower = 0; // u8
    wrinkleLowerScale = 0; // u8
    wrinkleLowerAspect = 0; // u8
    wrinkleLowerX = 0; // u8
    wrinkleLowerY = 0; // u8
    wrinkleUpper = 0; // u8
    wrinkleUpperScale = 0; // u8
    wrinkleUpperAspect = 0; // u8
    wrinkleUpperX = 0; // u8
    wrinkleUpperY = 0; // u8
    makeup0 = 0; // u8
    makeup0Color = 0; // u8
    makeup0Scale = 0; // u8
    makeup0Aspect = 0; // u8
    makeup0X = 0; // u8
    makeup0Y = 0; // u8
    makeup1 = 0; // u8
    makeup1Color = 0; // u8
    makeup1Scale = 0; // u8
    makeup1Aspect = 0; // u8
    makeup1X = 0; // u8
    makeup1Y = 0; // u8
    hairType = 0; // u16
    hairColor0 = 0; // u8
    hairColor1 = 0; // u8
    hairTypeFront = 0; // u8
    hairTypeBack = 0; // u8
    hairStyle = 0; // u8
    earType = 0; // u8
    earScale = 0; // u8
    earY = 0; // u8
    eyeType = 0; // u8
    eyeColor = 0; // u8
    eyeScale = 0; // u8
    eyeAspect = 0; // u8
    eyeRotate = 0; // u8
    eyeX = 0; // u8
    eyeY = 0; // u8
    eyeShadowColor = 0; // u8
    eyeHighlightType = 0; // u8
    eyeHighlightScale = 0; // u8
    eyeHighlightAspect = 0; // u8
    eyeHighlightRotate = 0; // u8
    eyeHighlightX = 0; // u8
    eyeHighlightY = 0; // u8
    eyelashUpperType = 0; // u8
    eyelashUpperScale = 0; // u8
    eyelashUpperAspect = 0; // u8
    eyelashUpperRotate = 0; // u8
    eyelashUpperX = 0; // u8
    eyelashUpperY = 0; // u8
    eyelashLowerType = 0; // u8
    eyelashLowerScale = 0; // u8
    eyelashLowerAspect = 0; // u8
    eyelashLowerRotate = 0; // u8
    eyelashLowerX = 0; // u8
    eyelashLowerY = 0; // u8
    eyeLidUpperType = 0; // u8
    eyeLidUpperScale = 0; // u8
    eyeLidUpperAspect = 0; // u8
    eyeLidUpperRotate = 0; // u8
    eyeLidUpperX = 0; // u8
    eyeLidUpperY = 0; // u8
    eyelidLowerType = 0; // u8
    eyelidLowerScale = 0; // u8
    eyelidLowerAspect = 0; // u8
    eyelidLowerRotate = 0; // u8
    eyelidLowerX = 0; // u8
    eyelidLowerY = 0; // u8
    eyebrowType = 0; // u8
    eyebrowColor = 0; // u8
    eyebrowScale = 0; // u8
    eyebrowAspect = 0; // u8
    eyebrowRotate = 0; // u8
    eyebrowX = 0; // u8
    eyebrowY = 0; // u8
    noseType = 0; // u8
    noseScale = 0; // u8
    noseY = 0; // u8
    mouthType = 0; // u8
    mouthColor = 0; // u8
    mouthScale = 0; // u8
    mouthAspect = 0; // u8
    mouthRotate = 0; // u8
    mouthY = 0; // u8
    beardType = 0; // u8
    beardColor = 0; // u8
    beardShortType = 0; // u8
    beardShortColor = 0; // u8
    mustacheType = 0; // u8
    mustacheColor = 0; // u8
    mustacheScale = 0; // u8
    mustacheAspect = 0; // u8
    mustacheY = 0; // u8
    glassType1 = 0; // u8
    glassColor1 = 0; // u8
    glassScale = 0; // u8
    glassAspect = 0; // u8
    glassY = 0; // u8
    glassType2 = 0; // u8
    glassColor2 = 0; // u8
    moleScale = 0; // u8
    moleX = 0; // u8
    moleY = 0; // u8
    unkDefault45 = 0; // u8
}
exports.CharInfoEx = CharInfoEx;
