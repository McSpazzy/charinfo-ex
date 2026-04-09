import { CharInfoOffset } from "./CharInfoOffset";
import { getStringUTF16NullTerminated } from "./Helpers";
export class CharInfoEx {
  constructor() {}

  private static bytesToUuidV4(bytes: Uint8Array): string {
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  }

  private static uuidV4ToBytes(uuid: string): Uint8Array {
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

  private static writeStringUTF16Fixed(data: DataView, offset: number, maxChars: number, value: string, littleEndian = true): void {
    const text = value ?? "";
    for (let i = 0; i < maxChars; i++) {
      const codeUnit = i < text.length ? text.charCodeAt(i) : 0;
      data.setUint16(offset + i * 2, codeUnit, littleEndian);
    }
  }

  public static FromSaveFileArrayBuffer(saveBuffer: ArrayBufferLike): CharInfoEx[];
  public static FromSaveFileArrayBuffer(saveBuffer: ArrayBufferLike, index: number): CharInfoEx;
  public static FromSaveFileArrayBuffer(saveBuffer: ArrayBufferLike, indexes: number[]): CharInfoEx[];
  public static FromSaveFileArrayBuffer(saveBuffer: ArrayBufferLike, index: number | number[] | undefined = undefined): CharInfoEx | CharInfoEx[] {
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

    const charArray: CharInfoEx[] = [];
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
    } else {
      return charArray[index - 1];
    }
  }

  public static FromArrayLike(arrayLike: Iterable<number>): CharInfoEx {
    var data = Uint8Array.from(arrayLike);
    return CharInfoEx.FromArrayBuffer(data.buffer);
  }

  public static FromArrayBuffer(buffer: ArrayBufferLike): CharInfoEx {
    const charItem = new CharInfoEx();
    const dataView = new DataView(buffer);
    const u8 = (offset: CharInfoOffset) => dataView.getUint8(offset);
    const u16 = (offset: CharInfoOffset) => dataView.getUint16(offset, true);
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

  public ToArrayBuffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(152);
    const dataView = new DataView(buffer);

    const u8 = (offset: CharInfoOffset, value: number) => dataView.setUint8(offset, value & 0xff);
    const u16 = (offset: CharInfoOffset, value: number) => dataView.setUint16(offset, value & 0xffff, true);

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

  public static ToArrayBuffer(charInfo: CharInfoEx): ArrayBuffer {
    return charInfo.ToArrayBuffer();
  }

  public toJson(pretty: boolean = true): string {
    if (pretty) {
      return JSON.stringify(this, null, 4);
    } else {
      return JSON.stringify(this);
    }
  }

  public static fromJson(jsonString: string): CharInfoEx;
  public static fromJson(jsonString: string): CharInfoEx[];
  public static fromJson(jsonString: string): CharInfoEx | CharInfoEx[] {
    const parsed = JSON.parse(jsonString);

    if (Array.isArray(parsed)) {
      return parsed.map((item) => Object.assign(new CharInfoEx(), item));
    }

    return Object.assign(new CharInfoEx(), parsed);
  }

  uuidv4: string = "";
  name: string = ""; // utf16 - 11 char
  fontRegion: number = 0;
  gender: number = 0; // u8
  height: number = 0; // u8
  build: number = 0; // u8
  regionMove: number = 0; // u8
  faceFlags: number = 0; // u8
  facelineType: number = 0; // u8
  facelineColor: number = 0; // u8
  wrinkleLower: number = 0; // u8
  wrinkleLowerScale: number = 0; // u8
  wrinkleLowerAspect: number = 0; // u8
  wrinkleLowerX: number = 0; // u8
  wrinkleLowerY: number = 0; // u8
  wrinkleUpper: number = 0; // u8
  wrinkleUpperScale: number = 0; // u8
  wrinkleUpperAspect: number = 0; // u8
  wrinkleUpperX: number = 0; // u8
  wrinkleUpperY: number = 0; // u8
  makeup0: number = 0; // u8
  makeup0Color: number = 0; // u8
  makeup0Scale: number = 0; // u8
  makeup0Aspect: number = 0; // u8
  makeup0X: number = 0; // u8
  makeup0Y: number = 0; // u8
  makeup1: number = 0; // u8
  makeup1Color: number = 0; // u8
  makeup1Scale: number = 0; // u8
  makeup1Aspect: number = 0; // u8
  makeup1X: number = 0; // u8
  makeup1Y: number = 0; // u8
  hairType: number = 0; // u16
  hairColor0: number = 0; // u8
  hairColor1: number = 0; // u8
  hairTypeFront: number = 0; // u8
  hairTypeBack: number = 0; // u8
  hairStyle: number = 0; // u8
  earType: number = 0; // u8
  earScale: number = 0; // u8
  earY: number = 0; // u8
  eyeType: number = 0; // u8
  eyeColor: number = 0; // u8
  eyeScale: number = 0; // u8
  eyeAspect: number = 0; // u8
  eyeRotate: number = 0; // u8
  eyeX: number = 0; // u8
  eyeY: number = 0; // u8
  eyeShadowColor: number = 0; // u8
  eyeHighlightType: number = 0; // u8
  eyeHighlightScale: number = 0; // u8
  eyeHighlightAspect: number = 0; // u8
  eyeHighlightRotate: number = 0; // u8
  eyeHighlightX: number = 0; // u8
  eyeHighlightY: number = 0; // u8
  eyelashUpperType: number = 0; // u8
  eyelashUpperScale: number = 0; // u8
  eyelashUpperAspect: number = 0; // u8
  eyelashUpperRotate: number = 0; // u8
  eyelashUpperX: number = 0; // u8
  eyelashUpperY: number = 0; // u8
  eyelashLowerType: number = 0; // u8
  eyelashLowerScale: number = 0; // u8
  eyelashLowerAspect: number = 0; // u8
  eyelashLowerRotate: number = 0; // u8
  eyelashLowerX: number = 0; // u8
  eyelashLowerY: number = 0; // u8
  eyeLidUpperType: number = 0; // u8
  eyeLidUpperScale: number = 0; // u8
  eyeLidUpperAspect: number = 0; // u8
  eyeLidUpperRotate: number = 0; // u8
  eyeLidUpperX: number = 0; // u8
  eyeLidUpperY: number = 0; // u8
  eyelidLowerType: number = 0; // u8
  eyelidLowerScale: number = 0; // u8
  eyelidLowerAspect: number = 0; // u8
  eyelidLowerRotate: number = 0; // u8
  eyelidLowerX: number = 0; // u8
  eyelidLowerY: number = 0; // u8
  eyebrowType: number = 0; // u8
  eyebrowColor: number = 0; // u8
  eyebrowScale: number = 0; // u8
  eyebrowAspect: number = 0; // u8
  eyebrowRotate: number = 0; // u8
  eyebrowX: number = 0; // u8
  eyebrowY: number = 0; // u8
  noseType: number = 0; // u8
  noseScale: number = 0; // u8
  noseY: number = 0; // u8
  mouthType: number = 0; // u8
  mouthColor: number = 0; // u8
  mouthScale: number = 0; // u8
  mouthAspect: number = 0; // u8
  mouthRotate: number = 0; // u8
  mouthY: number = 0; // u8
  beardType: number = 0; // u8
  beardColor: number = 0; // u8
  beardShortType: number = 0; // u8
  beardShortColor: number = 0; // u8
  mustacheType: number = 0; // u8
  mustacheColor: number = 0; // u8
  mustacheScale: number = 0; // u8
  mustacheAspect: number = 0; // u8
  mustacheY: number = 0; // u8
  glassType1: number = 0; // u8
  glassColor1: number = 0; // u8
  glassScale: number = 0; // u8
  glassAspect: number = 0; // u8
  glassY: number = 0; // u8
  glassType2: number = 0; // u8
  glassColor2: number = 0; // u8
  moleScale: number = 0; // u8
  moleX: number = 0; // u8
  moleY: number = 0; // u8
  unkDefault45: number = 0; // u8
}
