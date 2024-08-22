/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  watchPathIgnorePatterns: [
    "tests/output/ios/AppIcon.appiconset/Contents.json",
    "/node_modules/",
    "/dist/",
  ],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  testEnvironment: "node",
  preset: "ts-jest",
};
