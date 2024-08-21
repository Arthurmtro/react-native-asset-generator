import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import { Generator } from "../src/generator";
import {
  ANDROID_FORMAT_TO_FILE_NAME,
  ANDROID_FORMAT_TO_SIZE,
  ANDROID_SIZES,
} from "../src/android.types";
import {
  IOS_SIZES,
  IOS_FORMAT_TO_FILE_NAME,
  IOS_FORMAT_TO_SIZE,
} from "../src/ios.types";

describe("Icon Generator", () => {
  const inputPath = path.join(__dirname, "..", "test", "input", "input.webp");
  const projectPath = path.join(__dirname, "..", "test", "output");

  beforeAll(() => {
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }
  });

  afterEach(() => {
    fs.rmSync(projectPath, { recursive: true, force: true });
  });

  it("should generate all Android assets with the correct dimensions and paths", async () => {
    const generator = new Generator({ inputPath, projectPath });
    await generator.generateAndroid();

    for (const size of Object.values(ANDROID_SIZES)) {
      const outputPath = path.join(
        projectPath,
        "android/app/src/main/res",
        ANDROID_FORMAT_TO_FILE_NAME[size],
        "ic_launcher.png"
      );

      // Check if the file was created
      expect(fs.existsSync(outputPath)).toBe(true);

      // Verify the file dimensions
      const { width, height } = await sharp(outputPath).metadata();
      expect(width).toBe(ANDROID_FORMAT_TO_SIZE[size]);
      expect(height).toBe(ANDROID_FORMAT_TO_SIZE[size]);
    }
  });

  it("should generate all iOS assets with the correct dimensions and paths", async () => {
    const generator = new Generator({ inputPath, projectPath });
    await generator.generateIOS();

    for (const size of Object.values(IOS_SIZES)) {
      const outputPath = path.join(
        projectPath,
        "AppIcon.appiconset",
        IOS_FORMAT_TO_FILE_NAME[size]
      );

      expect(fs.existsSync(outputPath)).toBe(true);

      const { width, height } = await sharp(outputPath).metadata();
      expect(width).toBe(IOS_FORMAT_TO_SIZE[size]);
      expect(height).toBe(IOS_FORMAT_TO_SIZE[size]);
    }
  });
});
