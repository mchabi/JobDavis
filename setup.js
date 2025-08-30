#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");

function detectPackageManager() {
  if (fs.existsSync("bun.lockb") || fs.existsSync("bun.lock")) return "bun";
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
  if (fs.existsSync("yarn.lock")) return "yarn";
  if (fs.existsSync("package-lock.json")) return "npm";
  return "npm";
}

function getRunCommand(packageManager) {
  const commands = {
    npm: "npm run",
    yarn: "yarn",
    pnpm: "pnpm",
    bun: "bun",
  };
  return commands[packageManager] || "npm run";
}

function getInstallCommand(packageManager) {
  const commands = {
    npm: "npm install",
    yarn: "yarn add",
    pnpm: "pnpm add",
    bun: "bun add",
  };
  return commands[packageManager] || "npm install";
}

function main() {
  const packageManager = detectPackageManager();
  console.log(`🔍 Detected package manager: ${packageManager}`);

  const runCmd = getRunCommand(packageManager);

  console.log("🚀 ...");
  try {
    console.log("📦 Setting up the project & Installing dependencies...");
    execSync(`${getInstallCommand(packageManager)}`, { stdio: "inherit" });
    console.log("🐶 Setting up Husky...");
    execSync("npx husky init", { stdio: "inherit" });

    console.log("✅ Setup complete!");
    console.log(`\n🎉 You can now run:`);
    console.log(`  ${runCmd} dev     - Start development server`);
    console.log(`  ${runCmd} build   - Build for production`);
    console.log(`  ${runCmd} lint    - Run linter`);
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    process.exit(1);
  }
}
if (require.main === module) {
  main();
}
module.exports = { detectPackageManager, getRunCommand, getInstallCommand };
