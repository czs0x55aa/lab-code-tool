# coding=utf8
import sys
sys.path.append("..")

from DBconnect import SQLTool

# 链接数据库
sql_tool = SQLTool()
# 获取所有表名，过滤掉Yb开头的表
table_name_list = [x for x in sql_tool.get_all_tables_name() if x.find('Yb') == -1]

def update_comment():
    # 定义要修改的字段名和备注名
    field_comment_dict = {
        'DataStatus': u'数据状态',
        'AuditStatus': u'审计状态',
        'MakeDate': u'制单日期'
    }
    for table_name in table_name_list:
        for field, comment in field_comment_dict.items():
            # 检查该表是否有这个字段名
            if sql_tool.table_has_field(table_name, field):
                # 添加备注，如果备注存在则直接覆盖掉
                sql_tool.add_field_comment(table_name, field, comment)

def update_field_name():
    field_name_dict = {
        'DocDate': 'MakeDate'
    }
    for table_name in table_name_list:
        for old_name, new_name in field_name_dict.items():
            # 检查表中是否有这个字段名
            if sql_tool.table_has_field(table_name, old_name):
                # 修改这个字段名
                sql_tool.update_field_name(table_name, old_name, new_name)

if __name__ == '__main__':

    for table_name in table_name_list:
        if sql_tool.table_has_field(table_name, 'IsDeleted'):
            print table_name
            sql_tool.update_field_type(table_name, 'IsDeleted', 'NUMBER(2)', 'default 0')
            break
