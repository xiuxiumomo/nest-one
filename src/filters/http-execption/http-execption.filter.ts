import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { execPath } from "process";
@Catch(HttpException)
export class HttpExecptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    console.log("当前错误状态码", status);
    const message = exception.message;

    const exceptionResponse: any = exception.getResponse();

    let validatorMessage = exceptionResponse;
    console.log("当前错误状态码", exceptionResponse);
    if (typeof validatorMessage === "object") {
      validatorMessage = exceptionResponse.message;
    }
    //全局过滤去除data
    response.status(status).json({
      code: status,
      data: null,
      message: validatorMessage || message,
    });
  }
}
