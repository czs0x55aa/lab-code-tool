# coding=utf8
import re

class BasePacker(object):
    def __init__(self, db):
        self.db = db


class SimplePacker(BasePacker):
    def pack_single_table(self, table_name):
        structure_list = self.db.get_table_structure(table_name)
        # 检查查询结果是否为空
        if structure_list is None:
            return None
        # 定义要过滤掉的字段名
        ignore_col_list = ['ID', 'IsDeleted', 'DeleterUserCD', 'DeletionTime', 'LastModificationTime', 'CreationTime', 'CreatorUserCD']
        # 用于封装的键名
        dict_key = ['col_name', 'col_type', 'col_comment', 'col_len', 'col_scale']
        # 数据库中类型到前端页面类型的映射
        type_transform = {
            'TIMESTAMP': 'date',
            'DATE': 'date',
            'NUMBER': 'number',
            'VARCHAR': 'string'
        }
        re_data_type = re.compile('([A-Z]+)')
        # 对每行数据执行数据处理，处理后以字典形式返回
        def data_process(element):
            return_list = {}
            for item in element:
                key, val = item
                if key == 'col_type':
                    tf_key = re_data_type.findall(val)[0]
                    if tf_key == 'NUMBER' and element[3][1] == 2:
                        # 如果该字段是NUMBER(2)则设为枚举类型
                        return_list[key] = 'enum'
                    else:
                        return_list[key] = type_transform[tf_key]
                elif key == 'col_comment':
                    # 若comment为空，则comment等于col_name
                    return_list[key] = element[0][1] if val is None else val.decode('utf-8')
                else:
                    return_list[key] = val
            return return_list

        pack_list = []
        for item in structure_list:
            # 过滤掉不用返回的列
            if item[0] in ignore_col_list:
                continue
            item_dict = dict(data_process(zip(dict_key, item)))
            pack_list.append(item_dict)
        return pack_list
