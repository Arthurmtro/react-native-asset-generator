# React Native Assets Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

**React Native Icon Generator** is a tool designed to simplify and speed up the process of generating all necessary app icon assets for both Android and iOS platforms using a single source image. This tool is intended to streamline the asset generation process, allowing developers to focus more on building features and less on manually creating app icons.

## Features

### ✅ Completed Features

- **Generate Android Assets:**
  - Automatically generate all required Android icon assets (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) from a single image file.
- **Generate iOS Assets:**
  - Automatically generate all required iOS icon assets for various device resolutions and sizes within the `AppIcon.appiconset` folder.

### 🚧 Planned Features

- **Custom Path Selection/Input for Android and iOS:**
  - Allow users to specify custom output directories for generated Android and iOS assets.
- **Support for Android Rounded Icons:**
  - Option to generate Android rounded icons for devices that support adaptive icons.

### 🤔 Why not Features

- **Custom Asset Sizes:**
  - Enable users to specify custom dimensions or add additional sizes beyond the default set.
- **Web Platform Support:**
  - Extend the generator to create assets for web applications (e.g., favicons, manifest icons).
- **Generate Splash Screens:**
  - Add support for generating splash screen assets for both Android and iOS platforms.

## Installation

To install the package, use npm or yarn:

```bash
npm install react-native-asset-generator
```

or

```bash
yarn add react-native-asset-generator
```

## Usage

### Basic Usage

1. **Generate Android and iOS Icons:**

   ```bash
   node ./path/to/your/generator --input ./path/to/image.png --output ./output/directory
   ```

   This command will generate all the necessary Android and iOS icons in the specified output directory.

### Example

```typescript
import { Generator } from "react-native-asset-generator";

const generator = new Generator("./path/to/input.png", "./path/to/output");
generator.generate();
```

## Contributing

We welcome contributions! Please submit a pull request or open an issue to discuss the feature you'd like to add or the bug you'd like to fix.

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-native-asset-generator.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

We are constantly improving the tool. Below is our short-term roadmap:

- [ ] Add custom path selection for Android and iOS assets.
- [ ] Support for rounded icons on Android.
- [ ] Add a command-line interface (CLI) with more customization options.
- [ ] Implement web platform support.
- [ ] Extend support to generate splash screen assets for both platforms.

## Acknowledgements

This tool was inspired by the need for a fast and automated way to generate app icons for multiple platforms in React Native projects. We hope it helps the community as much as it has helped us.
