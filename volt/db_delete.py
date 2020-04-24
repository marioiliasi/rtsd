from volt.constants import *
from volt.library.voltdbclient import VoltProcedure, FastSerializer


def delete_by_id(db_client, table, record_id):
    if table == TABLE_USER:
        sql_procedure = PROCEDURE_DELETE_USER_BY_ID
    else:
        sql_procedure = PROCEDURE_DELETE_ACTIVITY_BY_ID

    procedure = VoltProcedure(db_client, sql_procedure,
                              [FastSerializer.VOLTTYPE_INTEGER])

    if isinstance(record_id, list):
        procedure.call(record_id)
    else:
        id_list = [record_id]
        procedure.call(id_list)


def delete_all(db_client, table):
    if table == TABLE_USER:
        sql_procedure = PROCEDURE_DELETE_ALL_USERS
    else:
        sql_procedure = PROCEDURE_DELETE_ALL_ACTIVITIES

    procedure = VoltProcedure(db_client, sql_procedure)
    procedure.call()
