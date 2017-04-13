# coding=UTF8
from jinja2 import Environment, FileSystemLoader

class CodeBuilder(object):
    def __init__(self, config_dict):
        self.env = Environment(**config_dict)

class HTMLBuilder(CodeBuilder):
    def create_html(self, template_page, render_packet, output_path=None):
        template = self.env.get_template(template_page)
        render_res = template.render(**render_packet)
        if output_path is not None:
            with open(output_path, 'w') as out:
                out.write(render_res.encode('utf8'))
        return render_res


# 模板引擎的配置文件
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
if __name__ == '__main__':
    table_name = 'YbTestMain'
    base_path = 'YbTest'
    db = OracleManager()
    dict_list = db.get_table_structure(table_name)
    # 封装页面中要渲染的数据
    render_module = {
        'base_path': base_path,
        'table_name': table_name,
        'field_list': dict_list,
        'list_len': len(dict_list)
    }
    # 创建生成器对象，并输出一个页面
    code_builder = HTMLBuilder(config_dict)
    code_builder.create_html('list.html', render_module, 'list.html')
    code_builder.create_html('edit.html', render_module, 'edit.html')
