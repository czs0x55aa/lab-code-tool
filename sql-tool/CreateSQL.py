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
        # 'DataStatus': u'数据状态',
        # 'AuditStatus': u'审计状态',
        # 'MakeDate': u'制单日期',
        # 'IsDeleted': u'是否删除',
        # 'DeleterUserCD': u'删除代码',
        # 'DeletionTime': u'删除时间',
        # 'LastModificationTime': u'修改时间',
        # 'LastModiferUserCD': u'修改人',
        # 'CreationTime': u'创建时间',
        # 'CreatorUserCD': u'创建者',
        # 'AuditTime': u'审核日期',
        # 'AuditCD': u'审核人代码',
        # 'AuditName': u'审核人',
        # 'AuditOpinion': u'审核意见'
        'ID': u'主键',
        'Sort': u'排序',
        'Code': u'代码',
        'Name': u'中文名称',
        'HelpWord': u'助记词',
        'Remark': u'备注',
        'LastModifierUserCD ': u'修改人',
        'Ratio': u'系数'
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
        'DocDate': 'MakeDate',
        'LastModifierUserId': 'LastModifierUserCD',
        'PurchaseBatchNo': 'PurchaseBatch'
    }
    for table_name in table_name_list:
        for old_name, new_name in field_name_dict.items():
            # 检查表中是否有这个字段名
            if sql_tool.table_has_field(table_name, old_name):
                # 修改这个字段名
                sql_tool.update_field_name(table_name, old_name, new_name)

def delete_field_name():
    """ 删除字段 """
    # del_field = ['AuditDate', 'AuthorName', 'AuditOpinions', 'SerialNum']
    # for table_name in table_name_list:
    #     for field in del_field:
    #         if sql_tool.table_has_field(table_name, field):
    #             sql_tool.del_field(table_name, field)

    # 删除从表中的下列
    detail_del_list = ['AuditTime', 'AuditCD', 'AuditName', 'AuditOpinion']
    for table_name in table_name_list:
        # 忽略从表以外的表
        if table_name.find('Detail') == -1:
            continue
        for field in detail_del_list:
            if sql_tool.table_has_field(table_name, field):
                sql_tool.del_field(table_name, field)


def add_field():
    """ 添加字段 """
    add_field_dict = {
        "IsDeleted": ('NUMBER(2)', 'default 0'),
        'DeleterUserCD': ('VARCHAR2(20)', ''),
        'DeletionTime': ('TIMESTAMP', ''),
        'LastModificationTime': ('TIMESTAMP', ''),
        'LastModifierUserCD': ('VARCHAR2(20)', ''),
        'CreationTime': ('TIMESTAMP', ''),
        'CreatorUserCD': ('VARCHAR2(20)', ''),
        'AuditTime': ('TIMESTAMP', ''),
        'AuditCD': ('VARCHAR2(20)', ''),
        'AuditName': ('VARCHAR2(20)', ''),
        'AuditOpinion': ('VARCHAR2(500)', ''),
        'DataStatus': ('NUMBER(2)', 'default 0'),
        'AuditStatus': ('NUMBER(2)', 'default 0'),
    }
    for table_name in table_name_list:
        for field, ele in add_field_dict.items():
            # 检查是否不存在这个字段
            if not sql_tool.table_has_field(table_name, field):
                # 添加该字段
                sql_tool.update_field_type(table_name, field, ele[0], ele[1], op='add')

def modify_field():
    modify_dict = {
        'IsDeleted': ('NUMBER(2)', 'default 0')
    }
    for table_name in table_name_list:
        for field, ele in modify_dict.items():
            # 检查是否存在该字段
            if sql_tool.table_has_field(table_name, field):
                # 修改该字段
                sql_tool.update_field_type(table_name, field, ele[0], ele[1], op='modify')



if __name__ == '__main__':

    update_comment()
