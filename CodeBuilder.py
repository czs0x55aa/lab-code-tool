# coding=UTF8
from jinja2 import Environment, FileSystemLoader
import os

class CodeBuilder(object):
    def __init__(self, config_dict):
        self.env = Environment(**config_dict)

class HTMLBuilder(CodeBuilder):
    def create_html(self, template_page, render_packet, output_path=None):
        template = self.env.get_template(template_page)
        render_res = template.render(**render_packet)
        if output_path is not None:
            with open(os.path.join(os.path.abspath(os.curdir), output_path), 'w') as out:
                out.write(render_res.encode('utf8'))
        return render_res


# 模板引擎的配置参数
config_dict ={
    'loader': FileSystemLoader('./templates'),
    'block_start_string': '<%',
    'block_end_string': '%>',
    'variable_start_string': '<<',
    'variable_end_string': '>>',
    'comment_start_string': '<#',
    'comment_end_string': '#>'
}

from DBconnect import OracleManager
from DataPacker import SimplePacker
if __name__ == '__main__':
    # 表名
    table_name = 'YbTestMain'
    # 子模块目录
    base_path = 'YbTest'
    db = OracleManager()
    # 创建打包器，并封装表格式
    simple_packer = SimplePacker(db)
    table_dict_list = simple_packer.pack_single_table(table_name)
    # 封装页面中要渲染的数据
    render_module = {
        'base_path': base_path,
        'table_name': db.get_table_comment(table_name),
        'field_list': table_dict_list,
        'list_len': len(table_dict_list)
    }
    # 创建生成器对象，并输出一个页面
    code_builder = HTMLBuilder(config_dict)

    # 清理 新建 output directory
    curPath = os.path.abspath(os.curdir)
    outPath = os.path.join(curPath, 'out')
    if os.path.exists(outPath):
        for i in os.listdir(outPath):
            os.remove(os.path.join(curPath, 'out', i))
    else:
        os.mkdir(outPath)

    def out_html(file):
        code_builder.create_html(file, render_module, 'out/' + file)

    out_html('list.html')
    out_html('edit.html')
    out_html('controller.js')
    out_html('dicserver.js')
    out_html('route.js')
    out_html('server.js')
