const fs = require("fs");
const path = require("path");

const logFile = path.resolve(__dirname, "../../logs/stamp.log");

fs.appendFileSync(logFile, `${new Date().toISOString()} - installed frontend\n`);
