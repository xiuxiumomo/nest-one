import { Injectable, LoggerService } from "@nestjs/common";
import * as winston from "winston";
import "winston-daily-rotate-file";

//默认配置
export const defaultOptions = {
  level: "warn",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
};

@Injectable()
export class CustomLogger implements LoggerService {
  private logger: winston.Logger;
  constructor(options: object = defaultOptions) {
    this.logger = winston.createLogger(options);
  }
  log(title: string = "事件名称", message: string | object) {
    const m = typeof message === "string" ? message : JSON.stringify(message);
    this.logger.info(`${title} - ${m}`);
  }
  error(title: string = "事件名称", message: string | object) {
    const m = typeof message === "string" ? message : JSON.stringify(message);
    this.logger.error(`${title} - ${m}`);
  }
  warn(title: string = "事件名称", message: string | object) {
    const m = typeof message === "string" ? message : JSON.stringify(message);
    this.logger.warn(`${title} - ${m}`);
  }
  debug(title: string = "事件名称", message: string | object) {
    const m = typeof message === "string" ? message : JSON.stringify(message);
    this.logger.debug(`${title} - ${m}`);
  }
  verbose(title: string = "事件名称", message: string | object) {
    const m = typeof message === "string" ? message : JSON.stringify(message);
    this.logger.verbose(`${title} - ${m}`);
  }
}
