## Description

This is recrutation project for company Beside The Park

## Getting Started

After downloading repository, you have to launch package files
```bash
    $ npm install package.json
    $ npm install recrutation_project/package.json
```

## Running the app

At first launch docker-compose.yml for database

After launch of MySQL docker, you have to execute FirstUsage.sql file
to make database work, and for creating databases or execute this lines

There is credentials for the DB:

* driver: mysql
* server: localhost
* login: root
* password: password

```mysql
    create schema beside_the_park;
    create schema beside_the_park_test;
    ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
    flush privileges
```

After this you can launch app

```bash
# development
$ npm run start
```

## Tests
If you want to run unit tests you have to use this command

```bash
# e2e tests
$ npm run test:e2e

```

