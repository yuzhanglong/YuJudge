# 项目一些规范的参考

## Git Commit

- 学习自Angular.js规范
```
<type>: <short summary>
  │           │
  │           │
  │           │
  │           └─⫸ 摘要，最后没有句号。       
  │
  └─⫸ 提交类型: build|ci|docs|feat|fix|perf|refactor|style|test
```


##### Type

必须是以下之一:
- **build**: 影响构建系统或外部依赖项的更改
- **ci**: 对CI配置文件和脚本的更改
- **docs**: 仅文档更改
- **feat**: 新功能
- **fix**: 错误修复
- **perf**: 更改代码以提高性能
- **refactor**: 既无法修复错误也未添加功能的代码更改
- **style**: 不会影响代码含义的更改（空格，格式，缺少分号等）
- **test**: 添加缺失的测试或更正现有的测试