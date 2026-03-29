import type { Config } from "jest";

const config: Config = {
  projects: [
    {
      displayName: "frontend",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/src/app/**/*.test.{ts,tsx}"],
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          {
            tsconfig: "tsconfig.json",
            diagnostics: false,
          },
        ],
      },
      moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|svg|webp)$":
          "<rootDir>/src/__mocks__/fileMock.ts",
      },
      setupFiles: ["<rootDir>/src/setupEnv.ts"],
      setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    },
    {
      displayName: "backend",
      testEnvironment: "node",
      testMatch: ["<rootDir>/src/server/**/*.test.ts"],
      transform: {
        "^.+\\.ts$": [
          "ts-jest",
          {
            tsconfig: "tsconfig.json",
            diagnostics: false,
          },
        ],
      },
    },
  ],
};

export default config;
