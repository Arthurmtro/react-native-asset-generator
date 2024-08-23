import { Command } from "commander";
import { Generator, GeneratorOptions } from "./generator";

const program = new Command();
const version = process.env.npm_package_version ?? "1.0.0";

program
  .version(version)
  .description("React native assets Generator")
  .option("-i, --inputPath <file>", "input image file")
  .option("-o, --projectPath <dir>", "output directory")
  .option("-b, --backgroundColor <color>", "background color")
  .option("-android, --androidPath <dir>", "android output directory")
  .option("-ios, --iosPath <dir>", "iOS output directory")
  .action(async (options: GeneratorOptions) => {
    const { inputPath, projectPath, backgroundColor, androidPath, iosPath } =
      options;

    const generator = new Generator({
      backgroundColor,
      projectPath,
      androidPath,
      inputPath,
      iosPath,
    });
    await generator.generate();
  });

program.parse(process.argv);
