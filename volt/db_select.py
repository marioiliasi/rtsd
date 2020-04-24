from volt.constants import EQ
from volt.library.voltdbclient import VoltProcedure, FastSerializer

PROCEDURE_TYPE = "@AdHoc"
SELECT_ALL = "SELECT * FROM {}"
SELECT_BY_ID = "SELECT * FROM {} WHERE id = {}"
SELECT_BY_NUMERIC_COLUMN = "SELECT * FROM {} WHERE {} {} {}"
SELECT_BY_STRING_PATTERN = "SELECT * FROM {} WHERE {} LIKE '%{}%'"


def select_by_id(db_client, table, user_id):
    procedure = VoltProcedure(db_client, PROCEDURE_TYPE, [FastSerializer.VOLTTYPE_STRING])
    sql = SELECT_BY_ID.format(table, user_id)
    result = procedure.call([sql]).tables[0]
    for row in result.tuples:
        print(row)


def select_all(db_client, table):
    procedure = VoltProcedure(db_client, PROCEDURE_TYPE, [FastSerializer.VOLTTYPE_STRING])
    sql = SELECT_ALL.format(table)
    result = procedure.call([sql]).tables[0]
    # for row in result.tuples:
    #     print(row)


def select_by_numeric_column(db_client, table, column, operation, value):
    procedure = VoltProcedure(db_client, PROCEDURE_TYPE, [FastSerializer.VOLTTYPE_STRING])
    sql = SELECT_BY_NUMERIC_COLUMN.format(table, column, operation, value)
    result = procedure.call([sql]).tables[0]
    for row in result.tuples:
        print(row)


def select_by_string_pattern(db_client, table, column, pattern):
    procedure = VoltProcedure(db_client, PROCEDURE_TYPE, [FastSerializer.VOLTTYPE_STRING])
    sql = SELECT_BY_STRING_PATTERN.format(table, column, pattern)
    result = procedure.call([sql]).tables[0]
    for row in result.tuples:
        print(row)
