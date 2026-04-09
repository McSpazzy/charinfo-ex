export enum CharInfoOffset {
  createId1 = 0x0, //s32
  createId2 = 0x4, //s32
  createId3 = 0x8, //s32
  createId4 = 0xc, //s32
  name = 0x10, // utf16 - 11 char, 22 bytes
  fontRegion = 0x26,
  gender = 0x27, // u8
  height = 0x28, // u8
  build = 0x29, // u8
  regionMove = 0x2a, // u8

  // Bit 0 - Unknown
  // Bit 1 - Bangs Side
  // Bit 2 - Back Dual Color
  // Bit 3 - Bangs Dual Color
  // Bit 4 - Eye Shadow Enabled
  // Bit 5 - Mouth Invert?
  // Bit 6 - Moustache Inverted
  // Bit 7 - Mole
  faceFlags = 0x2b, // u8 bitflags
  facelineType = 0x2c, // u8
  facelineColor = 0x2d, // u8
  wrinkleLower = 0x2e, // u8
  wrinkleLowerScale = 0x2f, // u8
  wrinkleLowerAspect = 0x30, // u8
  wrinkleLowerX = 0x31, // u8
  wrinkleLowerY = 0x32, // u8
  wrinkleUpper = 0x33, // u8
  wrinkleUpperScale = 0x34, // u8
  wrinkleUpperAspect = 0x35, // u8
  wrinkleUpperX = 0x36, // u8
  wrinkleUpperY = 0x37, // u8
  makeup0 = 0x38, // u8
  makeup0Color = 0x39, // u8
  makeup0Scale = 0x3a, // u8
  makeup0Aspect = 0x3b, // u8
  makeup0X = 0x3c, // u8
  makeup0Y = 0x3d, // u8
  makeup1 = 0x3e, // u8
  makeup1Color = 0x3f, // u8
  makeup1Scale = 0x40, // u8
  makeup1Aspect = 0x41, // u8
  makeup1X = 0x42, // u8
  makeup1Y = 0x43, // u8
  hairType = 0x44, // u16
  hairColor0 = 0x46, // u8
  hairColor1 = 0x47, // u8
  hairTypeFront = 0x48, // u8
  hairTypeBack = 0x49, // u8
  
  // Bit 0 - Left Side
  // Bit 1 - Right Side
  hairStyle = 0x4a, // u8 bitflag
  earType = 0x4b, // u8
  earScale = 0x4c, // u8
  earY = 0x4d, // u8
  eyeType = 0x4e, // u8
  eyeColor = 0x4f, // u8
  eyeScale = 0x50, // u8
  eyeAspect = 0x51, // u8
  eyeRotate = 0x52, // u8
  eyeX = 0x53, // u8
  eyeY = 0x54, // u8
  eyeShadowColor = 0x55, // u8
  eyeHighlightType = 0x56, // u8
  eyeHighlightScale = 0x57, // u8
  eyeHighlightAspect = 0x58, // u8
  eyeHighlightRotate = 0x59, // u8
  eyeHighlightX = 0x5a, // u8
  eyeHighlightY = 0x5b, // u8
  eyelashUpperType = 0x5c, // u8
  eyelashUpperScale = 0x5d, // u8
  eyelashUpperAspect = 0x5e, // u8
  eyelashUpperRotate = 0x5f, // u8
  eyelashUpperX = 0x60, // u8
  eyelashUpperY = 0x61, // u8
  eyelashLowerType = 0x62, // u8
  eyelashLowerScale = 0x63, // u8
  eyelashLowerAspect = 0x64, // u8
  eyelashLowerRotate = 0x65, // u8
  eyelashLowerX = 0x66, // u8
  eyelashLowerY = 0x67, // u8
  eyeLidUpperType = 0x68, // u8
  eyeLidUpperScale = 0x69, // u8
  eyeLidUpperAspect = 0x6a, // u8
  eyeLidUpperRotate = 0x6b, // u8
  eyeLidUpperX = 0x6c, // u8
  eyeLidUpperY = 0x6d, // u8
  eyelidLowerType = 0x6e, // u8
  eyelidLowerScale = 0x6f, // u8
  eyelidLowerAspect = 0x70, // u8
  eyelidLowerRotate = 0x71, // u8
  eyelidLowerX = 0x72, // u8
  eyelidLowerY = 0x73, // u8
  eyebrowType = 0x74, // u8
  eyebrowColor = 0x75, // u8
  eyebrowScale = 0x76, // u8
  eyebrowAspect = 0x77, // u8
  eyebrowRotate = 0x78, // u8
  eyebrowX = 0x79, // u8
  eyebrowY = 0x7a, // u8
  noseType = 0x7b, // u8
  noseScale = 0x7c, // u8
  noseY = 0x7d, // u8
  mouthType = 0x7e, // u8
  mouthColor = 0x7f, // u8
  mouthScale = 0x80, // u8
  mouthAspect = 0x81, // u8
  mouthRotate = 0x82, // u8
  mouthY = 0x83, // u8
  beardType = 0x84, // u8
  beardColor = 0x85, // u8
  beardShortType = 0x86, // u8
  beardShortColor = 0x87, // u8
  mustacheType = 0x88, // u8
  mustacheColor = 0x89, // u8
  mustacheScale = 0x8a, // u8
  mustacheAspect = 0x8b, // u8
  mustacheY = 0x8c, // u8
  glassType1 = 0x8d, // u8
  glassColor1 = 0x8e, // u8
  glassScale = 0x8f, // u8
  glassAspect = 0x90, // u8
  glassY = 0x91, // u8
  glassType2 = 0x92, // u8
  glassColor2 = 0x93, // u8
  moleScale = 0x94, // u8
  moleX = 0x95, // u8
  moleY = 0x96, // u8
  unkDefault45 = 0x97, // u8
}
