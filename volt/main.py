import time

from volt.constants import TABLE_USER, TABLE_ACTIVITY, NUMBER_OF_USERS, NUMBER_OF_ACTIVITIES
from volt.db_populate import populate_table_user, populate_table_activity
from volt.db_select import select_all
from volt.library.voltdbclient import FastSerializer


def main():
    db_client = FastSerializer("localhost", 21212)
    timing_populate_database(db_client)
    print('\n')
    timing_select_all(db_client)
    print('\n')
    timing_delete_all(db_client)


def timing_populate_database(db_client):
    start = time.time()
    populate_table_user(db_client, NUMBER_OF_USERS)
    end = time.time()
    print('Populate with {} rows User Table : {:.2f} sec.'.format(NUMBER_OF_USERS, end - start))

    start = time.time()
    populate_table_activity(db_client, NUMBER_OF_ACTIVITIES)
    end = time.time()
    print('Populate with {} rows Activity Table : {:.2f} sec.'.format(NUMBER_OF_ACTIVITIES, end - start))


def timing_select_all(db_client):
    start = time.time()
    select_all(db_client, TABLE_USER)
    end = time.time()
    print('Select all({} rows) from User Table : {:.2f} sec.'.format(NUMBER_OF_USERS, end - start))

    start = time.time()
    select_all(db_client, TABLE_ACTIVITY)
    end = time.time()
    print('Select all({} rows) from Activity Table : {:.2f} sec.'.format(NUMBER_OF_ACTIVITIES, end - start))


def timing_delete_all(db_client):
    start = time.time()
    populate_table_user(db_client, NUMBER_OF_USERS)
    end = time.time()
    print('Delete all({} rows) from User Table : {:.2f} sec.'.format(NUMBER_OF_USERS, end - start))

    start = time.time()
    populate_table_activity(db_client, NUMBER_OF_ACTIVITIES)
    end = time.time()
    print('Delete all({} rows) from Activity Table : {:.2f} sec.'.format(NUMBER_OF_ACTIVITIES, end - start))


if __name__ == "__main__":
    main()
