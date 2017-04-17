# lab-code-tool
实验室项目前端页面生成工具  
PS：cx_Oracle安装比较容易出问题，建议使用Anconda的conda进行安装
## 依赖
- python 2.7
- cx_Oracle
- jinja2

## 目录结构
```
lab-code-tool/  
├── templates/              页面模板
│     └── ...  
├── CodeBuilder.py          代码生成与输出
├── DBconnect.py            数据库连接和基本查询
├── DataPacker.py           对数据进行自定义的封装
├── GenerateTest.py         代码生成测试
├── BaseAd_config.json		生成器的配置文件
└── README.md
```

## 执行
```python
python GenerateTest.py BaseAd_config.json
```
BaseAd_config.json包含了该模块的配置信息
