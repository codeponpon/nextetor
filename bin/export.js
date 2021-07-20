/* eslint-disable @typescript-eslint/no-var-requires */
const cli = require("next/dist/cli/next-export");
const loadEnvConfig = require("./env");

loadEnvConfig();

cli.nextExport();
