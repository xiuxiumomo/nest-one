import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
//接口格式化
import { TransformInterceptor } from "./interceptor/transform/transform.interceptor";
//全局异常过滤
import { HttpExecptionFilter } from "./filters/http-execption/http-execption.filter";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExecptionFilter());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3939);
}
bootstrap();
