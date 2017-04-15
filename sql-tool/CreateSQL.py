# coding=utf8
import sys
sys.path.append("..")

from DBconnect import SQLTool

# 链接数据库
sql_tool = SQLTool()
# 获取所有表名，过滤掉Yb开头的表
table_name_list = [x for x in sql_tool.get_all_tables_name() if x.find('Yb') == -1]

def update_comment():
    """ 修改字段备注 """
    # 定义要修改的字段名和备注名
    field_comment_dict = {
        'DataStatus': u'数据状态',
        'AuditStatus': u'审计状态',
        'MakeDate': u'制单日期',
        'IsDeleted': u'是否删除',
        'DeleterUserCD': u'',
        'DeletionTime': u'',
        'LastModificationTime': u'修改时间',
        'LastModiferUserCD': u''
    }
    for table_name in table_name_list:
        for field, comment in field_comment_dict.items():
            # 检查该表是否有这个字段名
            if sql_tool.table_has_field(table_name, field):
                # 添加备注，如果备注存在则直接覆盖掉
                sql_tool.add_field_comment(table_name, field, comment)

def update_field_name():
    """ 更新字段名称 """
    field_name_dict = {
        'DocDate': 'MakeDate'
    }
    for table_name in table_name_list:
        for old_name, new_name in field_name_dict.items():
            # 检查表中是否有这个字段名
            if sql_tool.table_has_field(table_name, old_name):
                # 修改这个字段名
                sql_tool.update_field_name(table_name, old_name, new_name)

def delete_field_name():
    """ 删除字段 """
    del_field = ['AuditDate', 'AuthorName', 'AuditOpinions']
    for table_name in table_name_list:
        for field in del_field:
            if sql_tool.table_has_field(table_name, field):
                sql_tool.del_field(table_name, field)


def add_field():
    """ 添加字段 """
    add_field_dict = {
        "IsDeleted": ('NUMBER(2)', 'default 0'),
        'DeleterUserCD': ('VARCHAR2(20)', ''),
        'DeletionTime': ('TIMESTAMP', ''),
        'LastModificationTime': ('TIMESTAMP', ''),
        'LastModiferUserCD': ('VARCHAR2(20)', ''),
        'CreationTime': ('TIMESTAMP', ''),
        'CreateorUserCD': ('VARCHAR2(20)', ''),
        'AuditTime': ('TIMESTAMP', ''),
        'AuditCD': ('VARCHAR2(20)', ''),
        'AuditName': ('VARCHAR2(20)', ''),
        'AuditOpinion': ('VARCHAR2(200)', '')
    }
    for table_name in table_name_list:
        for

if __name__ == '__main__':

    update_field_name()
