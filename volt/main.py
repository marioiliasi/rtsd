import timeit
from random import randint

from volt.constants import TABLE_USER, TABLE_ACTIVITY, NUMBER_OF_USERS, NUMBER_OF_ACTIVITIES, NUMBER_OF_CALLS
from volt.db_populate import populate_table_user, populate_table_activity
from volt.db_select import select_all, complex_select_one, select_by_id
from volt.db_delete import delete_all, delete_by_id
from volt.library.voltdbclient import FastSerializer


# Each functions is called in a separate function for a better usage of lib timeit

def get_db_client():
    return FastSerializer("localhost", 21212)


def populate_table_user_call():
    populate_table_user(get_db_client(), NUMBER_OF_USERS)


def populate_table_activity_call():
    populate_table_activity(get_db_client(), NUMBER_OF_ACTIVITIES)


def select_all_from_user():
    select_all(get_db_client(), TABLE_USER)


def select_all_from_activity():
    select_all(get_db_client(), TABLE_ACTIVITY)


def delete_all_from_user():
    delete_all(get_db_client(), TABLE_USER)


def delete_all_from_activity():
    delete_all(get_db_client(), TABLE_ACTIVITY)


def select_by_id_user():
    id_list = [randint(0, NUMBER_OF_USERS) for i in range(NUMBER_OF_USERS//2)]
    select_by_id(get_db_client(), TABLE_USER, id_list)


def select_by_id_activity():
    id_list = [randint(0, NUMBER_OF_ACTIVITIES) for i in range(NUMBER_OF_ACTIVITIES // 2)]
    select_by_id(get_db_client(), TABLE_ACTIVITY, id_list)


def delete_by_id_user():
    id_list = [randint(0, NUMBER_OF_USERS) for i in range(NUMBER_OF_USERS//2)]
    select_by_id(get_db_client(), TABLE_USER, id_list)


def delete_by_id_activity():
    id_list = [randint(0, NUMBER_OF_ACTIVITIES) for i in range(NUMBER_OF_ACTIVITIES // 2)]
    delete_by_id(get_db_client(), TABLE_ACTIVITY, id_list)


def complex_select():
    complex_select_one(get_db_client())


def timing_function(function, table, run_numbers):
    if table == TABLE_USER:
        n = NUMBER_OF_USERS
    else:
        n = NUMBER_OF_ACTIVITIES

    setup = 'from __main__ import ' + function
    run_numbers = run_numbers
    code = '''{}()'''.format(function)

    T = timeit.timeit(stmt=code, setup=setup, number=run_numbers)
    print('{} called with {} rows, {} times : sec {:.2f}.'.format(function, n, run_numbers, T))


if __name__ == "__main__":
    # Timing operation: INSERT INTO table
    print('INSERT INTO table')
    timing_function(populate_table_user_call.__name__, TABLE_USER, NUMBER_OF_CALLS)
    timing_function(populate_table_activity_call.__name__, TABLE_ACTIVITY, NUMBER_OF_CALLS)

    # Timing operation: SELECT * FROM table
    print('SELECT * FROM table')
    timing_function(select_all_from_user.__name__, TABLE_USER, NUMBER_OF_CALLS)
    timing_function(select_all_from_activity.__name__, TABLE_ACTIVITY, NUMBER_OF_CALLS)

    # Timing operation: SELECT * FROM table WHERE id = ?
    print('SELECT * FROM table WHERE id = ?')
    timing_function(select_by_id_user.__name__, TABLE_USER, NUMBER_OF_CALLS)
    timing_function(select_by_id_activity.__name__, TABLE_ACTIVITY, NUMBER_OF_CALLS)

    # Timing operation : SELECT * FROM Activity WHERE activity.id = user.id and user.first_name like '%xyz%'
    print('Complex query')
    setup = 'from __main__ import complex_select'
    code = '''complex_select()'''
    T = timeit.timeit(stmt=code, setup=setup, number=NUMBER_OF_CALLS)
    print('Function complex_select called {} times: {:.2f}'.format(NUMBER_OF_CALLS, T))

    # Timing operations : DELETE * FROM table WHERE id = ?
    print('DELETE * FROM table WHERE id = ?')
    timing_function(delete_by_id_user.__name__, TABLE_USER, NUMBER_OF_CALLS)
    timing_function(delete_by_id_activity.__name__, TABLE_ACTIVITY, NUMBER_OF_CALLS)

    # Timing operation : DELETE * FROM table
    print('DELETE * FROM table')
    timing_function(delete_all_from_user.__name__, TABLE_USER, NUMBER_OF_CALLS)
    timing_function(delete_all_from_activity.__name__, TABLE_ACTIVITY, NUMBER_OF_CALLS)
