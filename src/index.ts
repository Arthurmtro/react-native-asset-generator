import { Command } from "commander";
import { Generator } from "./generator";

const program = new Command();

program
  .version("1.0.0")
  .description("React native assets Generator")
  .option("-i, --input <file>", "Input image file")
  .option("-o, --output <dir>", "Output directory")
  .action(async (options) => {
    const { input, output } = options;

    const generator = new Generator(input, output);
    await generator.generate();
  });

program.parse(process.argv);
