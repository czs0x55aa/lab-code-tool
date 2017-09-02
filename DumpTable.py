# coding=utf8
import __future__
import json
from DBconnect import OracleManager

def dump():
    db = OracleManager()
    tables = db.get_all_tables()

    tables_dict = {}
    # 获取每张表的字段名、类型、注释、长度、精度
    field_name = ['name', 'type', 'comment', 'length', 'precision', 'scale']
    for table_name in tables:
        columns = []
        table_struct = db.get_table_structure(table_name)
        for item in table_struct:
            columns.append(dict(zip(field_name, item)))
        tables_dict[table_name] = columns
        print('export %s finish.' % table_name)

    print('==========\nexport table number: %d' % len(tables_dict))
    json_str = json.dumps(tables_dict, indent=4, ensure_ascii=False)
    # print(json_str)
    with open('tables_dump.txt', 'w') as file:
        file.write(json_str)

if __name__ == '__main__':
    dump()
