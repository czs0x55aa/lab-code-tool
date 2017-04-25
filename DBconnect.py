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
            select user_tab_columns.column_name, user_tab_columns.data_type, user_col_comments.comments, user_tab_columns.data_length, user_tab_columns.data_precision, user_tab_columns.data_scale
            from user_tab_columns
            left join user_col_comments on user_tab_columns.column_name = user_col_comments.column_name
            WHERE user_tab_columns.table_name='%s' and user_col_comments.table_name=user_tab_columns.table_name
            order by user_tab_columns.column_id
        """ % table_name
        query_res = self.execute_sql(query_sql)
        if len(query_res) == 0:
            return None
        return query_res


db_namespace = 'GXZY_USER'
class SQLTool(OracleManager):
    def get_all_tables_name(self):
        """
        查询所有的表名
        """
        query_sql = "select table_name from user_tables"
        query_res = self.execute_sql(query_sql)
        return [x[0] for x in query_res]

    def table_has_field(self, table_name, field_name):
        """
        检查表中是否有这个字段名
        """
        query_sql = "select column_name from user_tab_columns where table_name='%s'" % table_name
        query_res = self.execute_sql(query_sql)
        # 检查表结构中是否有这个字段
        if field_name in [x[0] for x in query_res]:
            return True
        return False

    def add_field_comment(self, table_name, field_name, comment):
        """
        给数据表中的一个字段添加备注
        """
        comment_sql = "comment on column \"%s\".\"%s\" is '%s'" % (table_name, field_name, comment)
        self.cursor.execute(comment_sql)
        print 'add comment %s(%s) from %s' % (field_name, comment, table_name)

    def update_field_name(self, table_name, old_field, new_field):
        """
        修改数据表中的一个字段名
        """
        alter_sql = "alter table \"%s\" rename column \"%s\" to \"%s\"" % (table_name, old_field, new_field)
        self.cursor.execute(alter_sql)
        print 'update %s to %s to %s' % (old_field, new_field, table_name)

    def update_field_type(self, table_name, field_name, type_str, default_str=None, op='modify'):
        """
        修改数据表中的一个字段类型
        """
        alter_sql = "alter table \"%s\" %s \"%s\" %s " % (table_name, op, field_name, type_str)
        if default_str is not None:
            alter_sql += default_str
        # 为了避免表中有数据无法修改字段类型，先清空表中数据
        if op == 'modify':
            self.table_clear(table_name)
        # 修改字段类型
        self.cursor.execute(alter_sql)
        print '%s %s(%s) from %s' % (op, field_name, type_str, table_name)

    def del_field(self, table_name, field_name):
        """
        删除表中的一个字段
        """
        alter_sql = "alter table \"%s\" drop column \"%s\"" % (table_name, field_name)
        self.cursor.execute(alter_sql)
        print 'drop column %s from %s' % (field_name, table_name)

    def table_clear(self, table_name):
        """
        清空表中的数据
        """
        delete_sql = "delete from \"%s\"" % table_name
        self.cursor.execute(delete_sql)
