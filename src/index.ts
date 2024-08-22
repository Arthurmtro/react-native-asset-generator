import { Command } from "commander";
import { Generator, GeneratorOptions } from "./generator";

const program = new Command();
const version = process.env.npm_package_version ?? "1.0.0";

program
  .version(version)
  .description("React native assets Generator")
  .option("-i, --inputPath <file>", "Input image file")
  .option("-o, --projectPath <dir>", "Output directory")
  .option("-b, --backgroundColor <color>", "Background color")
  .action(async (options: GeneratorOptions) => {
    const { inputPath, projectPath, backgroundColor } = options;

    const generator = new Generator({
      inputPath,
      projectPath,
      backgroundColor,
    });
    await generator.generate();
  });

program.parse(process.argv);
