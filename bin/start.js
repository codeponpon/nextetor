/* eslint-disable @typescript-eslint/no-var-requires */
const cli = require("next/dist/cli/next-start");
const loadEnvConfig = require("./env");

loadEnvConfig();

cli.nextStart();
