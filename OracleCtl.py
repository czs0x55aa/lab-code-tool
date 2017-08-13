# coding=utf8
# Work in progress!
from DBconnect import OracleManager

db_namespace = 'GXZY_USER'
class DBAgent(object):
    def __init__(self, db):
        self.db = db
        self.tables = self.db.get_all_tables()
        # print self.tables
        self.dir = None

    def api(self, func, args):
        f = getattr(self, func)
        f(*args)

    def cd(self, table_name):
        """ 查询数据表的数据量 """
        try:
            res = self.db.execute_sql('select count(*) from "%s"' % (table_name))
            print 'table %s rownubmer: %d.' % (table_name, res[0][0])
            self.dir = table_name
        except Exception, ex:
            print Exception, ex

    def find(self, field, value, dump_num=10):
        """ 查询表满足条件的数据 """
        if self.dir is not None:
            if field is None or value is None:
                # 无条件查询
                res = self.db.execute_sql('select * from "%s"' % (table_name))
                self.__output(res)
            else:
                # 条件查询
                pass
        else:
            print ('Please to Select Table.')

    def __output(self, content):
        if isinstance(content, (list, tuple)):
            for item in content:
                print item
        else:
            print item

    def open_mode(self, sql):
        try:
            res = self.db.execute_sql(sql)
            print res
        except Exception, ex:
            print Exception, ex

class Parser(object):
    def __init__(self, db):
        self.agent = DBAgent(db);
        self.commands = {
            'cd': (1, 1),
            'find': (2, 3),
        }
        pass

    def resolve(self, cmd):
        # debug mode
        # return self.agent.open_mode(cmd)
        cmd_spl = cmd.strip().split()
        if len(cmd_spl) == 0:
            return
        cmd_head = cmd_spl[0]
        if cmd_head in self.commands:
            min_off, max_off = self.commands[cmd_head]
            if len(cmd_spl[1:]) >= min_off and len(cmd_spl[1:]) <= max_off:
                # call director to execute
                self.agent.api(cmd_head, cmd_spl[1:])
            else:
                print ('Command Format Error')
        else:
            print ('Command Head Error.')


if __name__ == '__main__':
    dbManager = OracleManager()
    cmdParser = Parser(dbManager)
    while True:
        cmd = raw_input('input:')
        cmdParser.resolve(cmd)
        print ('\n')
