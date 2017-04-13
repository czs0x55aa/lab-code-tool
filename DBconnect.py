# coding=utf8
import cx_Oracle
import os
import re

# default configuation
os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'

oracle_user = 'gxzy_user'
oracle_passwd = 'gxzy_user_2291862'
oracle_dsn = cx_Oracle.makedsn("172.16.24.249", "1521", "GXZY")

# # 获取表的字段名
# SELECT column_name FROM user_tab_columns WHERE table_name='AnnualProtocol'

# # 获取表的字段名注释
# select column_name, comments from user_col_comments where table_name = 'AnnualProtocol'


class OracleManager(object):
    def __init__(self, user=oracle_user, passwd=oracle_passwd, dsn=oracle_dsn):
        self.db_connect = cx_Oracle.connect(user, passwd, dsn)
        self.cursor = self.db_connect.cursor()

    def execute_sql(self, sql_str):
        query_res = self.cursor.execute(sql_str)
        return query_res.fetchall()

    def get_table_structure(self, table_name):
        """
        查询表结构，包括：英文列名，列类型，中文列名，数据长度，精度
        """
        # 两张表的联合查询语句
        query_sql = """
            select user_tab_columns.column_name, user_tab_columns.data_type, user_col_comments.comments, user_tab_columns.data_length, user_tab_columns.data_scale
            from user_tab_columns
            left join user_col_comments on user_tab_columns.column_name = user_col_comments.column_name
            WHERE user_tab_columns.table_name='%s' and user_col_comments.table_name=user_tab_columns.table_name
        """ % table_name
        query_res = self.execute_sql(query_sql)
        # 定义要过滤掉的字段名
        ignore_col_lsit = ['IsDeleted', 'DeleterUserCD', 'DeletionTime', 'LastModificationTime', 'CreationTime', 'CreatorUserCD']
        # 用于封装的键名
        dict_key = ['col_name', 'col_type', 'col_comment', 'col_len', 'col_scale']
        # 数据库中类型到前端页面类型的映射
        type_transform = {
            'TIMESTAMP': 'date',
            'NUMBER': 'number',
            'VARCHAR': 'string'
        }
        re_data_type = re.compile('([A-z]+)')
        # 根据键名执行相应的数据处理
        def data_process(element):
            key, val = element
            if key == 'col_type':
                tf_key = re_data_type.findall(val)[0]
                return [key, type_transform[tf_key]]
            elif key == 'col_comment':
                return [key, val.decode('utf8')]
            else:
                return list(element)
        res_list = []
        for item in query_res:
            # 过滤掉不用返回的列
            if item[0] in ignore_col_lsit:
                continue
            # 将列的属性处理成字典的封装形式
            item_dict = dict([data_process(x) for x in zip(dict_key, item)])
            res_list.append(item_dict)
        return res_list
