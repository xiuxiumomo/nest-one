import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomException extends HttpException {
  constructor(message: string, code: number) {
    super(message, code);
  }
}
