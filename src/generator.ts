import path from "path";
import {
  ANDROID_SIZES,
  ANDROID_FORMAT_TO_FILE_NAME,
  ANDROID_FORMAT_TO_SIZE,
} from "./android.types";
import fs from "fs";
import sharpModule, { Sharp } from "sharp";
import {
  IOS_FORMAT_TO_FILE_NAME,
  IOS_FORMAT_TO_SIZE,
  IOS_SIZES,
} from "./ios.types";

export class Generator {
  private readonly sharp: Sharp;
  private readonly projectPath: string;

  constructor({
    inputPath,
    projectPath,
  }: {
    inputPath: string;
    projectPath: string;
  }) {
    this.projectPath = projectPath;
    this.sharp = sharpModule(inputPath);
  }

  public async generate() {
    // Android
    await this.generateAndroid();

    // IOS
    await this.generateIOS();
  }

  public async generateAndroid() {
    for (const size of Object.values(ANDROID_SIZES)) {
      const dimensions = ANDROID_FORMAT_TO_SIZE[size];
      const dirPath = path.join(
        this.projectPath,
        "android/app/src/main/res",
        ANDROID_FORMAT_TO_FILE_NAME[size]
      );

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const outputPath = path.join(dirPath, "ic_launcher.png");
      await this.sharp.resize(dimensions, dimensions).toFile(outputPath);
    }
  }

  public async generateIOS() {
    const iosOutputDir = path.join(this.projectPath, "AppIcon.appiconset");
    if (!fs.existsSync(iosOutputDir)) {
      fs.mkdirSync(iosOutputDir, { recursive: true });
    }

    for (const size of Object.values(IOS_SIZES)) {
      const dimensions = IOS_FORMAT_TO_SIZE[size];
      const outputPath = path.join(iosOutputDir, IOS_FORMAT_TO_FILE_NAME[size]);
      await this.sharp.resize(dimensions, dimensions).toFile(outputPath);
    }
  }
}
