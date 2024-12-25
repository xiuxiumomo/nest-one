import { Module } from "@nestjs/common";
// 环境配置

//mysql模块
import { TypeOrmModule } from "@nestjs/typeorm";
//redis模块
import { RedisModule } from "@nestjs-modules/ioredis";
//日志模块
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import "winston-daily-rotate-file";
//自己的crud模块
import { TagsModule } from "./modules/tags/tags.module";
import { ArticleModule } from "./modules/article/article.module";
//全局配置文件
import { getLogCongfig, mysqlConfig, redisConfig } from "../config/index.config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      username: mysqlConfig.username,
      password: mysqlConfig.password,
      database: mysqlConfig.database,
      entities: ["dist/modules/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),

    RedisModule.forRoot({
      type: "single",
      url: redisConfig.url,
      options: {
        password: redisConfig.password,
      },
    }),
    WinstonModule.forRoot(getLogCongfig(winston)),
    ArticleModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
