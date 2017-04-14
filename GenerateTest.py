# coding=utf8
import os
from DBconnect import OracleManager
from CodeBuilder import HTMLBuilder
from DataPacker import SimplePacker

# 表名
table_name = 'YbTestMain'
# 子模块目录
base_path = 'YbTest'
# 输出目录
output_dir = 'out/'

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
    table_dict_list = simple_packer.pack_single_table(table_name)
    # 封装页面中要渲染的数据
    render_module = {
        'base_path': base_path,
        'table_name': db.get_table_comment(table_name),
        'field_list': table_dict_list,
        'list_len': len(table_dict_list)
    }
    # 创建生成器对象
    code_builder = HTMLBuilder()
    def out_html(file):
        code_builder.create_html(file, render_module, output_dir + file)

    # 指定要使用的模板
    template_pages = ['list.html', 'edit.html', 'controller.js', 'dicserver.js', 'route.js', 'server.js']
    for page_name in template_pages:
        out_html(page_name)
