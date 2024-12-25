## 自定义错误状态码

### 使用方法

```ts
import {CustomException} from '../../common/exceptions/custom.exception'

throw new CustomException('发生错误',9000)
```