import * as winston from 'winston';

const consoleFormat = winston.format.printf(
  ({
    timestamp,
    level,
    message,
  }: {
    timestamp: Date;
    level: string;
    message: string;
  }) => `${timestamp.toString()} [${level}] : ${message}`,
);

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize({
      all: true,
    }),
    winston.format.timestamp(),
    consoleFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      dirname: 'logs',
      filename: 'logs.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});
