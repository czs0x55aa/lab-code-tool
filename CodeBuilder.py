# coding=UTF8
from jinja2 import Environment, FileSystemLoader


class HTMLBuilder(object):
    def __init__(self):
        pass



from DBconnect import OracleManager
if __name__ == '__main__':
    db = OracleManager()
    # print db.execute_sql("select * from user_col_comments where table_name = 'AnnualProtocol'")
    dict_list = db.get_table_structure('AnnualProtocol')
    print dict_list[0]['col_comment']
