import { Module } from "@nestjs/common";

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

//配置文件
import { getLogCongfig } from "./config/index";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123456",
      database: "note-one",
      entities: ["dist/modules/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),

    RedisModule.forRoot({
      type: "single",
      url: "redis://144.34.181.43:6380",
      options: {
        password: "xiuxiumomo",
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
