import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
export class CreateTagDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;
}
