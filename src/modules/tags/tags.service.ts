import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "./entities/tag.entity";
import { ListTagDto } from "./dto";
import { CustomException } from "../../common/exceptions/custom.exception";

import { InjectRedis } from "@nestjs-modules/ioredis";
import Redis from "ioredis";
@Injectable()
export class TagsService {
  constructor(
    @InjectRedis() private readonly redis: Redis,

    @InjectRepository(Tag) private tagsRepository: Repository<Tag>
  ) {}
  async create(createTagDto: CreateTagDto) {
    const hasTag = await this.tagsRepository.findOneBy({ name: createTagDto.name });

    if (hasTag) {
      throw new NotFoundException("标签已存在");
    }
    const tag = new Tag();
    tag.name = createTagDto.name;
    const res = await this.tagsRepository.save(tag);
    //实现一个自定义网络状态码
    //throw new CustomException("my custom error", 366);
    // throw new NotFoundException("找不到数据");
    // return res;
    return res;
  }

  async findAll(listTagDto: ListTagDto) {
    const { pageIndex = 1, pageSize = 10, id } = listTagDto;
    try {
      const query = this.tagsRepository
        .createQueryBuilder("tag")
        .skip((pageIndex - 1) * pageSize)
        .take(pageSize);

      if (id) {
        query.andWhere("tag.id = :id", { id });
      }

      const res = await query.getMany();
      this.redis.set("tags", JSON.stringify(res));
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
