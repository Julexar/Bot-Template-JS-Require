const { createLogger, format, transports } = require('winston');
const { printf } = format;
const myFormat = printf(info => `[${info.level}] ${info.message}`);

module.exports = {
    console: createLogger({
        transports: [new transports.Console()],
    }),
    log: createLogger({
        format: format.combine(format.timestamp(), format.colorize({ all: true }), myFormat),
        transports: [new transports.File({ filename: './src/client/logs/dev.log' })],
    })
};