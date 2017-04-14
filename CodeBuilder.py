# coding=UTF8
from jinja2 import Environment, FileSystemLoader
import os

# 默认的模板引擎的配置参数
default_config_dict ={
    'loader': FileSystemLoader('./templates'),
    'block_start_string': '<%',
    'block_end_string': '%>',
    'variable_start_string': '<<',
    'variable_end_string': '>>',
    'comment_start_string': '<#',
    'comment_end_string': '#>'
}

class BaseBuilder(object):
    def __init__(self, config_dict=default_config_dict):
        self.env = Environment(**config_dict)

class HTMLBuilder(BaseBuilder):
    def create_html(self, template_page, render_packet, output_path=None):
        template = self.env.get_template(template_page)
        render_res = template.render(**render_packet)
        if output_path is not None:
            with open(os.path.join(os.path.abspath(os.curdir), output_path), 'w') as out:
                out.write(render_res.encode('utf8'))
        return render_res
