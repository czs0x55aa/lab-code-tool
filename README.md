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
├── generate_config.json	生成器的配置文件
└── README.md
```

## generate_config配置
例如基地管理：
```json
{
	"output_dir": "out/",
	"base_path": "BaseAd",
	"base_path_name": "基地管理",
	"table_list": [
		{"table_name":"BaseInfo"},
		{"table_name":"ProductionStatus"},
		{"table_name":"ClimaticConditions"},
		{"table_name":"LevelYield"},
		{"table_name":"SeedbedPeriodStatus"},
		{"table_name":"TransplantPeriodInfo"},
		{"table_name":"GrowPeriodStatus"},
		{"table_name":"BakePeriodStatus"},
		{"table_name":"NurseryPestControl"},
		{"table_name":"TransplantPestControlTech"},
		{"table_name":"GrowPestControlTech"},
		{"table_name":"BakePestControlTech"},
		{"table_name":"BaseTechPlanManage"},
		{"table_name":"BaseEvaluation"}]
}
```

## 执行
```python
python GenerateTest.py
```
