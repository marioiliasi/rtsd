from volt.constants import TABLE_USER, PROCEDURE_SELECT_USER_BY_ID, PROCEDURE_SELECT_ACTIVITY_BY_ID
from volt.library.voltdbclient import VoltProcedure, FastSerializer

PROCEDURE_TYPE = "@AdHoc"
SELECT_ALL = "SELECT * FROM {}"
SELECT_BY_ID = "SELECT * FROM {} WHERE id = {}"
SELECT_BY_NUMERIC_COLUMN = "SELECT * FROM {} WHERE {} {} {}"
SELECT_BY_STRING_PATTERN = "SELECT * FROM {} WHERE {} LIKE '%{}%'"


def select_by_id(db_client, table, user_id):
    if table == TABLE_USER:
        sql_procedure = PROCEDURE_SELECT_USER_BY_ID
    else:
        sql_procedure = PROCEDURE_SELECT_ACTIVITY_BY_ID

    procedure = VoltProcedure(db_client, sql_procedure,
                              [FastSerializer.VOLTTYPE_INTEGER])

    if isinstance(user_id, list):
        procedure.call(user_id)
    else:
        id_list = [user_id]
        procedure.call(id_list)


def select_all(db_client, table):
    procedure = VoltProcedure(db_client, PROCEDURE_TYPE, [FastSerializer.VOLTTYPE_STRING])
    sql = SELECT_ALL.format(table)
    result = procedure.call([sql]).tables[0]


def select_by_numeric_column(db_client, table, column, operation, value):
    procedure = VoltProcedure(db_client, PROCEDURE_TYPE, [FastSerializer.VOLTTYPE_STRING])
    sql = SELECT_BY_NUMERIC_COLUMN.format(table, column, operation, value)
    result = procedure.call([sql]).tables[0]


def select_by_string_pattern(db_client, table, column, pattern):
    procedure = VoltProcedure(db_client, PROCEDURE_TYPE, [FastSerializer.VOLTTYPE_STRING])
    sql = SELECT_BY_STRING_PATTERN.format(table, column, pattern)
    result = procedure.call([sql]).tables[0]
    return result.status


def complex_select_one(db_client):
    procedure = VoltProcedure(db_client, PROCEDURE_TYPE, [FastSerializer.VOLTTYPE_STRING])
    sql = "with users_t as ( select id from User where first_name like '%xyz%' ) " \
          "select description from Activity where " \
          "Activity.user_id in (select id from users_t)"

    result = procedure.call([sql])
    return result.status



