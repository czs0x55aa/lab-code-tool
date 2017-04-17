# coding=utf8
import os
import re
import json

from DBconnect import OracleManager
from CodeBuilder import HTMLBuilder
from DataPacker import SimplePacker

# 加载配置文件
config_input = open('./generate_config.json', 'r')
config_text = config_input.read()
config_json = json.loads(config_text)

# 输出目录
output_dir = config_json['output_dir']
# 子模块目录
base_path = config_json['base_path']
# 子模块名称
base_path_name = config_json['base_path_name']
# 该模块块下的数据表名
table_list = [x['table_name'] for x in config_json['table_list']]

if __name__ == '__main__':
    # 清理 新建 output directory
    curPath = os.path.abspath(os.curdir)
    outPath = os.path.join(curPath, output_dir)
    if os.path.exists(outPath):
        for i in os.listdir(outPath):
            os.remove(os.path.join(curPath, output_dir, i))
    else:
        os.mkdir(outPath)

    db = OracleManager()
    # 创建打包器，封装表结构
    simple_packer = SimplePacker(db)
    # 创建生成器对象
    code_builder = HTMLBuilder()
    # 对每张表生成
    for table_name in table_list:
        # 封装主从表结构数据
        table_dict_list = simple_packer.pack_single_table(table_name)
        detail_dict_list = simple_packer.pack_single_table(table_name + 'Detail')
        # 封装页面中要渲染的数据
        render_module = {
            'base_path': base_path,
            'base_path_name': base_path_name,
            'table_name': table_name,
            'table_name_zh': db.get_table_comment(table_name),
            'field_list': table_dict_list,
            'detail_field_list': detail_dict_list,
            'list_len': len(table_dict_list),
            'detail_list_len': 0 if detail_dict_list is None else len(detail_dict_list)
        }

        def get_file_name(name, suff):
            return ''.join([name, '.', suff])
        # 指定要使用的模板和对应的生成文件名
        template_pages = {'list.html': get_file_name(table_name, 'html'),
                        'edit.html' if detail_dict_list is None else 'mutiple_edit.html': get_file_name(table_name+'edit', 'html'),
                        'controller.js': get_file_name(table_name+'_controller', 'js'),
                        'dicserver.js': get_file_name(table_name+'_dicserver', 'js'),
                        'route.js': get_file_name(table_name+'_route', 'js'),
                        'server.js': get_file_name(table_name+'_server', 'js')}
        # 生成代码
        for template, file_name in template_pages.items():
            code_builder.create_html(template, render_module, output_dir + file_name)

    # 指定要合并的文件名后缀名
    merge_list = ['_controller.js', '_dicserver.js', '_route.js', '_server.js']
    # 合并
    for _suff in merge_list:
        output_buf = []
        for file_name in os.listdir(outPath):
            # 查找相同后缀的文件
            if file_name.find(_suff) > 0:
                # 缓存文件内容
                with open(os.path.join(curPath, output_dir, file_name)) as input:
                    output_buf.append(input.read().strip())
                # 删除已缓存的文件
                os.remove(os.path.join(curPath, output_dir, file_name))
        # 重新生成合并后的文件
        with open(os.path.join(curPath, output_dir, _suff), 'w') as out:
            out.write('\n'.join(output_buf))
