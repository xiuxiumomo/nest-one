import { Module, DynamicModule, Global } from "@nestjs/common";
import { LoggerOptions } from "winston";
import { CustomLogger as CustomLoggerService, defaultOptions } from "./logger.service";
export const CUSTOM_LOGGER_TOKEN = "CUSTOM_LOGGER_TOKEN";
@Global()
@Module({})
export class CustomLogger {
  //启用默认配置
  public static forRoot(options: LoggerOptions = defaultOptions): DynamicModule {
    return {
      module: CustomLogger,
      providers: [
        {
          provide: CUSTOM_LOGGER_TOKEN,
          useValue: new CustomLoggerService(options),
        },
      ],
      exports: [CUSTOM_LOGGER_TOKEN],
    };
  }
}
