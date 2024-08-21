import { Command } from "commander";
import { Generator } from "./generator";

const program = new Command();

program
  .version("1.0.0")
  .description("React native assets Generator")
  .option("-i, --inputPath <file>", "Input image file")
  .option("-o, --projectPath <dir>", "Output directory")
  .action(async (options) => {
    const { inputPath, projectPath } = options;

    const generator = new Generator({ inputPath, projectPath });
    await generator.generate();
  });

program.parse(process.argv);
