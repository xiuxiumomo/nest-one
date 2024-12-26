import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto, ListTagDto } from "./dto/index";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
@Controller("tags")
export class TagsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly tagsService: TagsService
  ) {}

  @Post("create")
  create(@Body() createTagDto: CreateTagDto) {
    //{ name: '1' } 控制器过来的参数
    console.log(createTagDto, "控制器过来的参数");
    return this.tagsService.create(createTagDto);
  }

  @Post("list")
  async findAll(@Body() listTagDto: ListTagDto) {
    const res = await this.tagsService.findAll(listTagDto);
    this.logger.warn(`查询列表${JSON.stringify(res)}`);
    return res;
  }
}
