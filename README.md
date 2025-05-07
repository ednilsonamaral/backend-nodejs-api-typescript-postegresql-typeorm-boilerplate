# Boilerplate for a Node.js API with Typescript, PostgreSQL, TypeORM and InversifyJS

This README would normally document whatever steps are necessary to get your application up and running.


## Configuration, Install dependencies and Database

- Install Node.js v20.11.1;
- Run the following commands:
- `yarn install`
- `cp .env.example .env`
- `mkdir data`
- `docker-compose -f docker-compose.yml down`
- `docker-compose -f docker-compose.yml up -d`
- `yarn start:local`


## How can I create migrations?

- `npx typeorm migration:create -n AlterTableNameColumnDescription`
- Add this new migration at this file `src/core/db/migrations/index.ts`.


## Commit and Push Guidelines

Before every commit you need to run the following command: `yarn lint:fix`. Just after fix the files with Lint, then commit and push.


## Folder Structure

The folder structure must follow the pattern:
```
--- src
------ modules
--------- admin // DTOs, Use Cases and Controller from Admin
--------- user // DTOs, Use Cases and Controller from User
--------- index.ts // The main controller. We need to import all controllers here
```
