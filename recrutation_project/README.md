

  
 
## Description

This is recrutation project for company Beside The Park

## Getting Started

Create new nest.js project for npm
```bash
nest new project-name
```

Then move src and test directories and add all files in repository especialy docker-compose.yml and FirstUsage.sql

After that you need to install crucial repositories

```bash
    $ npm install --save @nestjs/typeorm typeorm mysql2
    $ npm i --save-dev @nestjs/testing
    $ npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql 
```

## Running the app

At first launch docker-compose.yml for database

After launch of MySQL docker, you have to execute FirstUsage.sql file
to make database work, and for creating databases or execute this lines
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

