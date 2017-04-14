# coding=utf8
import cx_Oracle
import os

# default configuation
os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'

oracle_user = 'gxzy_user'
oracle_passwd = 'gxzy_user_2291862'
oracle_dsn = cx_Oracle.makedsn("172.16.24.249", "1521", "GXZY")

# # 查询表的备注
# select comments from user_tab_comments where table_name='AnnualProtocol'
# # 获取表的字段名
# select column_name from user_tab_columns where table_name='AnnualProtocol'
# # 获取表的字段名注释
# select column_name, comments from user_col_comments where table_name = 'AnnualProtocol'


class OracleManager(object):
    def __init__(self, user=oracle_user, passwd=oracle_passwd, dsn=oracle_dsn):
        self.db_connect = cx_Oracle.connect(user, passwd, dsn)
        self.cursor = self.db_connect.cursor()

    def execute_sql(self, sql_str):
        query_res = self.cursor.execute(sql_str)
        return query_res.fetchall()

    def get_table_comment(self, table_name):
        """
        查询并返回表的备注名
        """
        query_sql = "select comments from user_tab_comments where table_name='%s'" % table_name
        query_res = self.execute_sql(query_sql)
        if len(query_res) > 0 and query_res[0][0] is not None:
            # 存在备注名则返回备注
            return query_res[0][0].decode('utf8')
        # 没有备注的情况返回英文表名
        return table_name

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
        if len(query_res) == 0:
            return None
        return query_res
