import random
import string
from volt.constants import PROCEDURE_INSERT_TABLE_USER, PROCEDURE_INSERT_TABLE_ACTIVITY, NUMBER_OF_USERS
from volt.library.voltdbclient import VoltProcedure, FastSerializer

# Make sure the Tables/Procedures from Constants.py have been defined in the DB


def populate_table_user(db_client, number_of_users):
    procedure = VoltProcedure(db_client, PROCEDURE_INSERT_TABLE_USER,
                              [FastSerializer.VOLTTYPE_INTEGER, FastSerializer.VOLTTYPE_STRING,
                               FastSerializer.VOLTTYPE_STRING, FastSerializer.VOLTTYPE_INTEGER])

    for i in range(number_of_users):
        procedure.call([i, random_string(), random_string(), random.randint(1, 75)])


def populate_table_activity(db_client, number_of_activities):
    procedure = VoltProcedure(db_client, PROCEDURE_INSERT_TABLE_ACTIVITY,
                              [FastSerializer.VOLTTYPE_INTEGER, FastSerializer.VOLTTYPE_INTEGER,
                               FastSerializer.VOLTTYPE_STRING, FastSerializer.VOLTTYPE_STRING])

    for i in range(number_of_activities):
        procedure.call([i, random.randint(0, NUMBER_OF_USERS), random_string(), random_string()])


def random_string(string_length=32):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(string_length))
