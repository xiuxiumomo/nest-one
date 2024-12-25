## 全局过滤器，抓取接口异常



## 返回类型设置
```js
// 成功返回
{
  code: 200,
  data: {
    // 详情类
    info: { 
      // 返回数据
    },

    // 列表类
    list: [],

    pagination: {
      total: 100,
      pageSize: 10,
      pages: 10,
      page: 1,
    },
  },
  message: "请求成功"
},

// 失败返回
{
  code: 400,
  message: "查询失败",
}


```
## NestJS 提供了基础的 HTTP 异常类


| 类                            | 含义                                                                                    | 状态码 |
| ----------------------------- | --------------------------------------------------------------------------------------- | ------ |
| BadRequestException           | 服务器不理解客户端的请求，未做任何处理                                                  | 400    |
| UnauthorizedException         | 用户未提供身份验证凭据，或者没有通过身份验证                                            | 401    |
| NotFoundException             | 所请求的资源不存在，或不可用                                                            | 404    |
| ForbiddenException            | 用户通过了身份验证，但是不具有访问资源所需的权限                                        | 403    |
| NotAcceptableException        | 不可接受                                                                                | 406    |
| RequestTimeoutException       | 请求超时                                                                                | 408    |
| ConflictException             | 冲突                                                                                    | 409    |
| GoneException                 | 所请求的资源已从这个地址转移，不再可用                                                  | 410    |
| PayloadTooLargeException      | 负载过大                                                                                | 413    |
| UnsupportedMediaTypeException | 客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。 | 415    |
| UnprocessableException        | 客户端上传的附件无法处理，导致请求失败                                                  | 422    |
| InternalServerErrorException  | 客户端请求有效，服务器处理时发生了意外                                                  | 500    |
| NotImplementedException       | 未实现                                                                                  | 501    |
| BadGatewayException           | 坏网关                                                                                  | 502    |
| ServiceUnavailableException   | 服务器无法处理请求，一般用于网站维护状态                                                | 503    |
| GatewayTimeoutException       | 网关超时                                                                                | 504    |
