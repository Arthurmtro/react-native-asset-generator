import path from "path";
import fs from "fs";
import sharpModule, { Sharp } from "sharp";
import {
  ANDROID_SIZES,
  ANDROID_FORMAT_TO_SIZE,
  ANDROID_FORMAT_TO_FILE_NAME,
} from "./android.types";
import { IOS_SIZE_MAP } from "./ios.types";

export interface GeneratorOptions {
  readonly inputPath: string;
  readonly projectPath: string;

  readonly backgroundColor?: string;
  readonly androidPath?: string;
  readonly iosPath?: string;
}

export class Generator {
  private readonly backgroundColor?: string;
  private readonly androidPath: string;
  private readonly inputPath: string;
  private readonly iosPath: string;

  private sharp?: Sharp;

  constructor({
    backgroundColor,
    projectPath,
    androidPath,
    inputPath,
    iosPath,
  }: GeneratorOptions) {
    this.backgroundColor = backgroundColor;
    this.iosPath = path.join(projectPath, iosPath ?? "ios");
    this.androidPath = path.join(
      projectPath,
      androidPath ?? "android/app/src/main/res"
    );
    this.inputPath = inputPath;
  }

  public async initSharp() {
    const isCloudOrigin = this.inputPath.startsWith("https://");
    if (!isCloudOrigin) {
      this.sharp = sharpModule(this.inputPath);
      return;
    }

    const response = await fetch(this.inputPath);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const source = Buffer.from(buffer);
    this.sharp = sharpModule(source);
  }

  public async generate() {
    // Android
    await this.generateAndroid();

    // iOS
    await this.generateIOS();
  }

  public async generateAndroid() {
    for (const size of Object.values(ANDROID_SIZES)) {
      const dimensions = ANDROID_FORMAT_TO_SIZE[size];
      const dirPath = path.join(
        this.androidPath,
        ANDROID_FORMAT_TO_FILE_NAME[size]
      );

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const outputPath = path.join(dirPath, "ic_launcher.png");
      await this.processAndSaveImage(outputPath, dimensions);
    }

    // Play Store Icon (512x512)
    if (!fs.existsSync(this.androidPath)) {
      fs.mkdirSync(this.androidPath, { recursive: true });
    }

    const playstoreOutputPath = path.join(
      this.androidPath,
      "ic_launcher-playstore.png"
    );
    const playstoreDimensions = 512;
    await this.processAndSaveImage(playstoreOutputPath, playstoreDimensions);

    // Rounded Icon for Android (ic_launcher_round)
    for (const size of Object.values(ANDROID_SIZES)) {
      const dimensions = ANDROID_FORMAT_TO_SIZE[size];
      const roundDirPath = path.join(
        this.androidPath,
        ANDROID_FORMAT_TO_FILE_NAME[size]
      );

      if (!fs.existsSync(roundDirPath)) {
        fs.mkdirSync(roundDirPath, { recursive: true });
      }

      const roundOutputPath = path.join(roundDirPath, "ic_launcher_round.png");
      await this.processAndSaveImage(roundOutputPath, dimensions, true);
    }
  }

  public async generateIOS() {
    const iosOutputDir = path.join(this.iosPath, "AppIcon.appiconset");
    if (!fs.existsSync(iosOutputDir)) {
      fs.mkdirSync(iosOutputDir, { recursive: true });
    }

    const contentsJson: {
      images: {
        filename: string;
        idiom: string;
        scale: string;
        size: string;
      }[];
    } = {
      images: [],
    };

    for (const { size, scale, idiom, filename } of IOS_SIZE_MAP) {
      const outputPath = path.join(iosOutputDir, filename);
      const actualSize = size * parseInt(scale[0]);
      await this.processAndSaveImage(outputPath, actualSize);

      contentsJson.images.push({
        filename,
        idiom,
        scale,
        size: `${size}x${size}`,
      });
    }

    // Write the Contents.json file
    fs.writeFileSync(
      path.join(iosOutputDir, "Contents.json"),
      JSON.stringify(contentsJson, null, 2)
    );
  }

  private async processAndSaveImage(
    outputPath: string,
    size: number,
    rounded: boolean = false
  ) {
    await this.initSharp();

    let image = this.sharp!.resize({
      fit: "cover",
      height: size,
      width: size,
      background: this.backgroundColor,
    });

    if (this.backgroundColor) {
      image = image.flatten({ background: this.backgroundColor });
    }

    if (rounded) {
      // Scale down the image to fit within the circle without being trimmed
      const scale = 1; // Adjust this scale factor as necessary
      const scaledSize = Math.round(size * scale);

      // Resize the image with the scaled-down size
      image = image.resize(scaledSize, scaledSize);

      // Create a circular mask
      const circle = Buffer.from(
        `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${
          size / 2
        }" /></svg>`
      );

      // Extend the image to the original size with transparent background
      image = image
        .extend({
          top: Math.round((size - scaledSize) / 2),
          bottom: Math.round((size - scaledSize) / 2),
          left: Math.round((size - scaledSize) / 2),
          right: Math.round((size - scaledSize) / 2),
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .composite([{ input: circle, blend: "dest-in" }]);
    }

    await image.toFile(outputPath);
  }
}
