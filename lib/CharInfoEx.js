import { CharInfoOffset } from "./CharInfoOffset";
import { getStringUTF16NullTerminated } from "./Helpers";
export class CharInfoEx {
    constructor() { }
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
        const idBytes = new Uint8Array(buffer, CharInfoOffset.createId1, 16);
        charItem.uuidv4 = CharInfoEx.bytesToUuidV4(idBytes);
        charItem.name = getStringUTF16NullTerminated(dataView, CharInfoOffset.name, 11);
        charItem.fontRegion = u8(CharInfoOffset.fontRegion);
        charItem.gender = u8(CharInfoOffset.gender);
        charItem.height = u8(CharInfoOffset.height);
        charItem.build = u8(CharInfoOffset.build);
        charItem.regionMove = u8(CharInfoOffset.regionMove);
        charItem.faceFlags = u8(CharInfoOffset.faceFlags);
        charItem.facelineType = u8(CharInfoOffset.facelineType);
        charItem.facelineColor = u8(CharInfoOffset.facelineColor);
        charItem.wrinkleLower = u8(CharInfoOffset.wrinkleLower);
        charItem.wrinkleLowerScale = u8(CharInfoOffset.wrinkleLowerScale);
        charItem.wrinkleLowerAspect = u8(CharInfoOffset.wrinkleLowerAspect);
        charItem.wrinkleLowerX = u8(CharInfoOffset.wrinkleLowerX);
        charItem.wrinkleLowerY = u8(CharInfoOffset.wrinkleLowerY);
        charItem.wrinkleUpper = u8(CharInfoOffset.wrinkleUpper);
        charItem.wrinkleUpperScale = u8(CharInfoOffset.wrinkleUpperScale);
        charItem.wrinkleUpperAspect = u8(CharInfoOffset.wrinkleUpperAspect);
        charItem.wrinkleUpperX = u8(CharInfoOffset.wrinkleUpperX);
        charItem.wrinkleUpperY = u8(CharInfoOffset.wrinkleUpperY);
        charItem.makeup0 = u8(CharInfoOffset.makeup0);
        charItem.makeup0Color = u8(CharInfoOffset.makeup0Color);
        charItem.makeup0Scale = u8(CharInfoOffset.makeup0Scale);
        charItem.makeup0Aspect = u8(CharInfoOffset.makeup0Aspect);
        charItem.makeup0X = u8(CharInfoOffset.makeup0X);
        charItem.makeup0Y = u8(CharInfoOffset.makeup0Y);
        charItem.makeup1 = u8(CharInfoOffset.makeup1);
        charItem.makeup1Color = u8(CharInfoOffset.makeup1Color);
        charItem.makeup1Scale = u8(CharInfoOffset.makeup1Scale);
        charItem.makeup1Aspect = u8(CharInfoOffset.makeup1Aspect);
        charItem.makeup1X = u8(CharInfoOffset.makeup1X);
        charItem.makeup1Y = u8(CharInfoOffset.makeup1Y);
        charItem.hairType = u16(CharInfoOffset.hairType);
        charItem.hairColor0 = u8(CharInfoOffset.hairColor0);
        charItem.hairColor1 = u8(CharInfoOffset.hairColor1);
        charItem.hairTypeFront = u8(CharInfoOffset.hairTypeFront);
        charItem.hairTypeBack = u8(CharInfoOffset.hairTypeBack);
        charItem.hairStyle = u8(CharInfoOffset.hairStyle);
        charItem.earType = u8(CharInfoOffset.earType);
        charItem.earScale = u8(CharInfoOffset.earScale);
        charItem.earY = u8(CharInfoOffset.earY);
        charItem.eyeType = u8(CharInfoOffset.eyeType);
        charItem.eyeColor = u8(CharInfoOffset.eyeColor);
        charItem.eyeScale = u8(CharInfoOffset.eyeScale);
        charItem.eyeAspect = u8(CharInfoOffset.eyeAspect);
        charItem.eyeRotate = u8(CharInfoOffset.eyeRotate);
        charItem.eyeX = u8(CharInfoOffset.eyeX);
        charItem.eyeY = u8(CharInfoOffset.eyeY);
        charItem.eyeShadowColor = u8(CharInfoOffset.eyeShadowColor);
        charItem.eyeHighlightType = u8(CharInfoOffset.eyeHighlightType);
        charItem.eyeHighlightScale = u8(CharInfoOffset.eyeHighlightScale);
        charItem.eyeHighlightAspect = u8(CharInfoOffset.eyeHighlightAspect);
        charItem.eyeHighlightRotate = u8(CharInfoOffset.eyeHighlightRotate);
        charItem.eyeHighlightX = u8(CharInfoOffset.eyeHighlightX);
        charItem.eyeHighlightY = u8(CharInfoOffset.eyeHighlightY);
        charItem.eyelashUpperType = u8(CharInfoOffset.eyelashUpperType);
        charItem.eyelashUpperScale = u8(CharInfoOffset.eyelashUpperScale);
        charItem.eyelashUpperAspect = u8(CharInfoOffset.eyelashUpperAspect);
        charItem.eyelashUpperRotate = u8(CharInfoOffset.eyelashUpperRotate);
        charItem.eyelashUpperX = u8(CharInfoOffset.eyelashUpperX);
        charItem.eyelashUpperY = u8(CharInfoOffset.eyelashUpperY);
        charItem.eyelashLowerType = u8(CharInfoOffset.eyelashLowerType);
        charItem.eyelashLowerScale = u8(CharInfoOffset.eyelashLowerScale);
        charItem.eyelashLowerAspect = u8(CharInfoOffset.eyelashLowerAspect);
        charItem.eyelashLowerRotate = u8(CharInfoOffset.eyelashLowerRotate);
        charItem.eyelashLowerX = u8(CharInfoOffset.eyelashLowerX);
        charItem.eyelashLowerY = u8(CharInfoOffset.eyelashLowerY);
        charItem.eyeLidUpperType = u8(CharInfoOffset.eyeLidUpperType);
        charItem.eyeLidUpperScale = u8(CharInfoOffset.eyeLidUpperScale);
        charItem.eyeLidUpperAspect = u8(CharInfoOffset.eyeLidUpperAspect);
        charItem.eyeLidUpperRotate = u8(CharInfoOffset.eyeLidUpperRotate);
        charItem.eyeLidUpperX = u8(CharInfoOffset.eyeLidUpperX);
        charItem.eyeLidUpperY = u8(CharInfoOffset.eyeLidUpperY);
        charItem.eyelidLowerType = u8(CharInfoOffset.eyelidLowerType);
        charItem.eyelidLowerScale = u8(CharInfoOffset.eyelidLowerScale);
        charItem.eyelidLowerAspect = u8(CharInfoOffset.eyelidLowerAspect);
        charItem.eyelidLowerRotate = u8(CharInfoOffset.eyelidLowerRotate);
        charItem.eyelidLowerX = u8(CharInfoOffset.eyelidLowerX);
        charItem.eyelidLowerY = u8(CharInfoOffset.eyelidLowerY);
        charItem.eyebrowType = u8(CharInfoOffset.eyebrowType);
        charItem.eyebrowColor = u8(CharInfoOffset.eyebrowColor);
        charItem.eyebrowScale = u8(CharInfoOffset.eyebrowScale);
        charItem.eyebrowAspect = u8(CharInfoOffset.eyebrowAspect);
        charItem.eyebrowRotate = u8(CharInfoOffset.eyebrowRotate);
        charItem.eyebrowX = u8(CharInfoOffset.eyebrowX);
        charItem.eyebrowY = u8(CharInfoOffset.eyebrowY);
        charItem.noseType = u8(CharInfoOffset.noseType);
        charItem.noseScale = u8(CharInfoOffset.noseScale);
        charItem.noseY = u8(CharInfoOffset.noseY);
        charItem.mouthType = u8(CharInfoOffset.mouthType);
        charItem.mouthColor = u8(CharInfoOffset.mouthColor);
        charItem.mouthScale = u8(CharInfoOffset.mouthScale);
        charItem.mouthAspect = u8(CharInfoOffset.mouthAspect);
        charItem.mouthRotate = u8(CharInfoOffset.mouthRotate);
        charItem.mouthY = u8(CharInfoOffset.mouthY);
        charItem.beardType = u8(CharInfoOffset.beardType);
        charItem.beardColor = u8(CharInfoOffset.beardColor);
        charItem.beardShortType = u8(CharInfoOffset.beardShortType);
        charItem.beardShortColor = u8(CharInfoOffset.beardShortColor);
        charItem.mustacheType = u8(CharInfoOffset.mustacheType);
        charItem.mustacheColor = u8(CharInfoOffset.mustacheColor);
        charItem.mustacheScale = u8(CharInfoOffset.mustacheScale);
        charItem.mustacheAspect = u8(CharInfoOffset.mustacheAspect);
        charItem.mustacheY = u8(CharInfoOffset.mustacheY);
        charItem.glassType1 = u8(CharInfoOffset.glassType1);
        charItem.glassColor1 = u8(CharInfoOffset.glassColor1);
        charItem.glassScale = u8(CharInfoOffset.glassScale);
        charItem.glassAspect = u8(CharInfoOffset.glassAspect);
        charItem.glassY = u8(CharInfoOffset.glassY);
        charItem.glassType2 = u8(CharInfoOffset.glassType2);
        charItem.glassColor2 = u8(CharInfoOffset.glassColor2);
        charItem.moleScale = u8(CharInfoOffset.moleScale);
        charItem.moleX = u8(CharInfoOffset.moleX);
        charItem.moleY = u8(CharInfoOffset.moleY);
        charItem.unkDefault45 = u8(CharInfoOffset.unkDefault45);
        return charItem;
    }
    ToArrayBuffer() {
        const buffer = new ArrayBuffer(152);
        const dataView = new DataView(buffer);
        const u8 = (offset, value) => dataView.setUint8(offset, value & 0xff);
        const u16 = (offset, value) => dataView.setUint16(offset, value & 0xffff, true);
        new Uint8Array(buffer, CharInfoOffset.createId1, 16).set(CharInfoEx.uuidV4ToBytes(this.uuidv4));
        CharInfoEx.writeStringUTF16Fixed(dataView, CharInfoOffset.name, 11, this.name);
        u8(CharInfoOffset.fontRegion, this.fontRegion);
        u8(CharInfoOffset.gender, this.gender);
        u8(CharInfoOffset.height, this.height);
        u8(CharInfoOffset.build, this.build);
        u8(CharInfoOffset.regionMove, this.regionMove);
        u8(CharInfoOffset.faceFlags, this.faceFlags);
        u8(CharInfoOffset.facelineType, this.facelineType);
        u8(CharInfoOffset.facelineColor, this.facelineColor);
        u8(CharInfoOffset.wrinkleLower, this.wrinkleLower);
        u8(CharInfoOffset.wrinkleLowerScale, this.wrinkleLowerScale);
        u8(CharInfoOffset.wrinkleLowerAspect, this.wrinkleLowerAspect);
        u8(CharInfoOffset.wrinkleLowerX, this.wrinkleLowerX);
        u8(CharInfoOffset.wrinkleLowerY, this.wrinkleLowerY);
        u8(CharInfoOffset.wrinkleUpper, this.wrinkleUpper);
        u8(CharInfoOffset.wrinkleUpperScale, this.wrinkleUpperScale);
        u8(CharInfoOffset.wrinkleUpperAspect, this.wrinkleUpperAspect);
        u8(CharInfoOffset.wrinkleUpperX, this.wrinkleUpperX);
        u8(CharInfoOffset.wrinkleUpperY, this.wrinkleUpperY);
        u8(CharInfoOffset.makeup0, this.makeup0);
        u8(CharInfoOffset.makeup0Color, this.makeup0Color);
        u8(CharInfoOffset.makeup0Scale, this.makeup0Scale);
        u8(CharInfoOffset.makeup0Aspect, this.makeup0Aspect);
        u8(CharInfoOffset.makeup0X, this.makeup0X);
        u8(CharInfoOffset.makeup0Y, this.makeup0Y);
        u8(CharInfoOffset.makeup1, this.makeup1);
        u8(CharInfoOffset.makeup1Color, this.makeup1Color);
        u8(CharInfoOffset.makeup1Scale, this.makeup1Scale);
        u8(CharInfoOffset.makeup1Aspect, this.makeup1Aspect);
        u8(CharInfoOffset.makeup1X, this.makeup1X);
        u8(CharInfoOffset.makeup1Y, this.makeup1Y);
        u16(CharInfoOffset.hairType, this.hairType);
        u8(CharInfoOffset.hairColor0, this.hairColor0);
        u8(CharInfoOffset.hairColor1, this.hairColor1);
        u8(CharInfoOffset.hairTypeFront, this.hairTypeFront);
        u8(CharInfoOffset.hairTypeBack, this.hairTypeBack);
        u8(CharInfoOffset.hairStyle, this.hairStyle);
        u8(CharInfoOffset.earType, this.earType);
        u8(CharInfoOffset.earScale, this.earScale);
        u8(CharInfoOffset.earY, this.earY);
        u8(CharInfoOffset.eyeType, this.eyeType);
        u8(CharInfoOffset.eyeColor, this.eyeColor);
        u8(CharInfoOffset.eyeScale, this.eyeScale);
        u8(CharInfoOffset.eyeAspect, this.eyeAspect);
        u8(CharInfoOffset.eyeRotate, this.eyeRotate);
        u8(CharInfoOffset.eyeX, this.eyeX);
        u8(CharInfoOffset.eyeY, this.eyeY);
        u8(CharInfoOffset.eyeShadowColor, this.eyeShadowColor);
        u8(CharInfoOffset.eyeHighlightType, this.eyeHighlightType);
        u8(CharInfoOffset.eyeHighlightScale, this.eyeHighlightScale);
        u8(CharInfoOffset.eyeHighlightAspect, this.eyeHighlightAspect);
        u8(CharInfoOffset.eyeHighlightRotate, this.eyeHighlightRotate);
        u8(CharInfoOffset.eyeHighlightX, this.eyeHighlightX);
        u8(CharInfoOffset.eyeHighlightY, this.eyeHighlightY);
        u8(CharInfoOffset.eyelashUpperType, this.eyelashUpperType);
        u8(CharInfoOffset.eyelashUpperScale, this.eyelashUpperScale);
        u8(CharInfoOffset.eyelashUpperAspect, this.eyelashUpperAspect);
        u8(CharInfoOffset.eyelashUpperRotate, this.eyelashUpperRotate);
        u8(CharInfoOffset.eyelashUpperX, this.eyelashUpperX);
        u8(CharInfoOffset.eyelashUpperY, this.eyelashUpperY);
        u8(CharInfoOffset.eyelashLowerType, this.eyelashLowerType);
        u8(CharInfoOffset.eyelashLowerScale, this.eyelashLowerScale);
        u8(CharInfoOffset.eyelashLowerAspect, this.eyelashLowerAspect);
        u8(CharInfoOffset.eyelashLowerRotate, this.eyelashLowerRotate);
        u8(CharInfoOffset.eyelashLowerX, this.eyelashLowerX);
        u8(CharInfoOffset.eyelashLowerY, this.eyelashLowerY);
        u8(CharInfoOffset.eyeLidUpperType, this.eyeLidUpperType);
        u8(CharInfoOffset.eyeLidUpperScale, this.eyeLidUpperScale);
        u8(CharInfoOffset.eyeLidUpperAspect, this.eyeLidUpperAspect);
        u8(CharInfoOffset.eyeLidUpperRotate, this.eyeLidUpperRotate);
        u8(CharInfoOffset.eyeLidUpperX, this.eyeLidUpperX);
        u8(CharInfoOffset.eyeLidUpperY, this.eyeLidUpperY);
        u8(CharInfoOffset.eyelidLowerType, this.eyelidLowerType);
        u8(CharInfoOffset.eyelidLowerScale, this.eyelidLowerScale);
        u8(CharInfoOffset.eyelidLowerAspect, this.eyelidLowerAspect);
        u8(CharInfoOffset.eyelidLowerRotate, this.eyelidLowerRotate);
        u8(CharInfoOffset.eyelidLowerX, this.eyelidLowerX);
        u8(CharInfoOffset.eyelidLowerY, this.eyelidLowerY);
        u8(CharInfoOffset.eyebrowType, this.eyebrowType);
        u8(CharInfoOffset.eyebrowColor, this.eyebrowColor);
        u8(CharInfoOffset.eyebrowScale, this.eyebrowScale);
        u8(CharInfoOffset.eyebrowAspect, this.eyebrowAspect);
        u8(CharInfoOffset.eyebrowRotate, this.eyebrowRotate);
        u8(CharInfoOffset.eyebrowX, this.eyebrowX);
        u8(CharInfoOffset.eyebrowY, this.eyebrowY);
        u8(CharInfoOffset.noseType, this.noseType);
        u8(CharInfoOffset.noseScale, this.noseScale);
        u8(CharInfoOffset.noseY, this.noseY);
        u8(CharInfoOffset.mouthType, this.mouthType);
        u8(CharInfoOffset.mouthColor, this.mouthColor);
        u8(CharInfoOffset.mouthScale, this.mouthScale);
        u8(CharInfoOffset.mouthAspect, this.mouthAspect);
        u8(CharInfoOffset.mouthRotate, this.mouthRotate);
        u8(CharInfoOffset.mouthY, this.mouthY);
        u8(CharInfoOffset.beardType, this.beardType);
        u8(CharInfoOffset.beardColor, this.beardColor);
        u8(CharInfoOffset.beardShortType, this.beardShortType);
        u8(CharInfoOffset.beardShortColor, this.beardShortColor);
        u8(CharInfoOffset.mustacheType, this.mustacheType);
        u8(CharInfoOffset.mustacheColor, this.mustacheColor);
        u8(CharInfoOffset.mustacheScale, this.mustacheScale);
        u8(CharInfoOffset.mustacheAspect, this.mustacheAspect);
        u8(CharInfoOffset.mustacheY, this.mustacheY);
        u8(CharInfoOffset.glassType1, this.glassType1);
        u8(CharInfoOffset.glassColor1, this.glassColor1);
        u8(CharInfoOffset.glassScale, this.glassScale);
        u8(CharInfoOffset.glassAspect, this.glassAspect);
        u8(CharInfoOffset.glassY, this.glassY);
        u8(CharInfoOffset.glassType2, this.glassType2);
        u8(CharInfoOffset.glassColor2, this.glassColor2);
        u8(CharInfoOffset.moleScale, this.moleScale);
        u8(CharInfoOffset.moleX, this.moleX);
        u8(CharInfoOffset.moleY, this.moleY);
        u8(CharInfoOffset.unkDefault45, this.unkDefault45);
        return buffer;
    }
    static ToArrayBuffer(charInfo) {
        return charInfo.ToArrayBuffer();
    }
    toJson(pretty = true) {
        if (pretty) {
            return JSON.stringify(this, null, 4);
        }
        else {
            return JSON.stringify(this);
        }
    }
    static fromJson(jsonString) {
        const parsed = JSON.parse(jsonString);
        if (Array.isArray(parsed)) {
            return parsed.map((item) => Object.assign(new CharInfoEx(), item));
        }
        return Object.assign(new CharInfoEx(), parsed);
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
