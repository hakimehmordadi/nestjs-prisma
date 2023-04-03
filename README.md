
## Holocene Assessment

This challenge can be done by 2 approaches:

* Front-end knows about the row state and sent states to the backend, In backend side by using row state we can realize which operation should be done (Create/Update/Delete)

* Front-end doesn't know about the row state or operation, in this case we can handle it by ORM on the backend side. I followed the challenge with this approach. I used <code>upsert</code> for doing (create/update/delete) in a single operation.

## Some Information

* <code>src/loans</code> includes the assessment challenge
* <code>src/tests</code> Because I didn't experienced <code>Prisma</code> before, I did try to create CRUD endpoints to be more familiar with this ORM


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Tutorial for creating nestjs endpoints using prisma ORM and Postgres

  <p>
  In this tutorial, you will learn how to build the backend REST API for a application. You will get started by creating a new NestJS project. Then you will start your own PostgreSQL server and connect to it using Prisma. Finally, you will build the REST API and document it with Swagger.
  </p>

## Description

<p>
Technologies you will use:

* NestJS as the backend framework
* Prisma as the Object-Relational Mapper (ORM)
* PostgreSQL as the database
* Swagger as the API documentation tool
* TypeScript as the programming language
</p>

## Generate the NestJS Project

The first thing you will need is to install the NestJS CLI. The NestJS CLI comes in very handy when working with a NestJS project.

```bash
$ npx @nestjs/cli new median
```

<p>
The CLI will prompt you to choose a package manager for your project — choose npm. Afterward, you should have a new NestJS project in the current directory.

The NestJS CLI has already created a few files for you. Some of the notable ones are:
</p>


* <code>src/app.module.ts:</code> The root module of the application.
* <code>src/app.controller.ts: </code> A basic controller with a single route: /. This route will return a simple 'Hello World!' message.
* <code>src/main.ts: </code> The entry point of the application. It will start the NestJS application.

<p> You can start your project by using the following command: </p>

```bash
$ npm run start:dev
```

## Create a PostgreSQL instance

<p>You will be using PostgreSQL as the database for your NestJS application. </p>

* You can setup a local database using this [Link](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)

#### OR

* You can install and run PostgreSQL on your machine through a Docker container. For this purpose firstly install and create a docker compose file:

```bash
$ touch docker-compose.yml
```

```
# docker-compose.yml

version: '3.8'
services:

  postgres:
    image: postgres:13.5
    restart: always
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres:/var/lib/postgresql/data
    ports:
      - '5432:5432'  

volumes:
  postgres:

```

After creating the config file, it should be started by below command:

```bash
$ docker-compose up
```

## Set up Prisma

To get started, first install the Prisma CLI as a development dependency. The Prisma CLI will allow you to run various commands and interact with your project.

```
npm install -D prisma
```

Inside your project use:

```
npx prisma init
```

<p>
This will create a new prisma directory with a schema.prisma file. This is the main configuration file that contains your database schema. This command also creates a .env file inside your project.
</p>

Your Prisma schema was created at prisma/schema.prisma
You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, [read](https://pris.ly/d/getting-started)
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.    
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information can find in prisma [documentation](https://pris.ly/d/getting-started)

## Set up environment variable

<p>Inside the .env file, you should see a DATABASE_URL environment variable with a dummy connection string. Replace this connection string with the one for your PostgreSQL instance.</p>

### Connection details
###### Connection URL
Prisma is based on the official PostgreSQL format for connection URLs, but does not support all arguments and includes additional arguments such as schema. Here's an overview of the components needed for a PostgreSQL connection URL:

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

* Host: IP address/domain of your database server, e.g. localhost
* Port:	Port on which your database server is running, e.g. 5432
* User:	Name of your database user, e.g. janedoe
* Password:	Password for your database user
* Database:	Name of the database you want to use, e.g. mydb

For docker Installation use bellow format:

```
// .env
DATABASE_URL="postgres://myuser:mypassword@localhost:5432/median-db"
```

For more information about making connection string look at this  [link](https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-url)


## Model the data

Now it's time to define the data models for your application. For a sample of models see bellow:

```
// prisma/schema.prisma

model Book {
  id          Int      @id @default(autoincrement())
  title       String   @unique
  description String?
  body        String
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

```


## Migrate the database

This place we have prisma installed and a connection string is created and configured. Now we need model our data. Using prisma give us this ability to provide a model for the table that we need and then excute it with bellow command then the result will sync our database with our models into the prisma schema file.

```
npx prisma migrate dev --name "init"
```

After excuting this command, you will see:

* Environment variables loaded from .env
* Prisma schema loaded from prisma\schema.prisma
* Datasource "db": PostgreSQL database "test", schema "public" at "localhost:5432"

* Applying migration `20230401070307_init`

* The following migration(s) have been created and applied from new schema changes:

```
    migrations/
      └─ 20230401070307_init/
        └─ migration.sql
```

* Your database is now in sync with your schema.

* Running generate... (Use --skip-generate to skip the generators)

* added 2 packages

✔ Generated Prisma Client (4.12.0 | library) to .\node_modules\@prisma\client

Note: Generator Indicates that you want to generate Prisma Client, a type-safe query builder for your database. It is used to send queries to your database.

Generate Prisma Client: Prisma will generate Prisma Client based on your latest schema. Since you did not have the Client library installed, the CLI will install it for you as well. You should see the <code>@prisma/client</code> package inside dependencies in your package.json file. Prisma Client is a TypeScript query builder auto-generated from your Prisma schema. It is tailored to your Prisma schema and will be used to send queries to the database.

## Seed the database with dummy data

Currently, the database is empty. So you will create a seed script that will populate the database with some dummy data.

Firstly, create a seed file called <code>prisma/seed.ts.</code> This file will contain the dummy data and queries needed to seed your database.

You can insert the running command into the package.json file.

```
"prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
```

## Create a Prisma service

Inside your NestJS application, it is good practice to abstract away the Prisma Client API from your application. To do this, you will create a new service that will contain Prisma Client. This service, called <code>PrismaService</code>, will be responsible for instantiating a <code>PrismaClient</code> instance and connecting to your database.

**NOTE**
The onModuleInit is optional — if you leave it out, Prisma will connect lazily on its first call to the database. We don't bother with onModuleDestroy, since Prisma has its own shutdown hooks where it will destroy the connection. For more info on <code>enableShutdownHooks.</code>

The Nest CLI gives you an easy way to generate modules and services directly from the CLI. Run the following command in your terminal:

```
npx nest generate module prisma
npx nest generate service prisma
```

After excuting these 2 commands you will see the messages like bellow:

```
CREATE src/prisma/prisma.module.ts
UPDATE src/app.module.ts
```

And

```
CREATE src/prisma/prisma.service.ts
CREATE src/prisma/prisma.service.spec.ts
UPDATE src/app.module.ts
```

Also using the bellow command, you can generate a specific file:

```
nest generate service path/service/todo --flat

nest generate controller path/controller/todo --flat
```

**Note 2:** In some cases running the nest generate command with the server already running may result in NestJS throwing an exception that says: Error: Cannot find module './app.controller'. If you run into this error, run the following command from the terminal: rm -rf dist and restart the server.

Now you need to create the prisma service codes. The <code>enableShutdownHooks</code> definition is needed to ensure your application shuts down gracefully. More information is available in the NestJS docs.

The Prisma module will be responsible for creating a singleton instance of the PrismaService and allow sharing of the service throughout your application. To do this, you will add the PrismaService to the exports array in the prisma.module.

Now, any module that imports the PrismaModule will have access to PrismaService and can inject it into its own components/services. This is a common pattern for NestJS applications.

With that out of the way, you are done setting up Prisma! You can now get to work on building the REST API.

## Implement CRUD operations 

In this section, you will implement the Create, Read, Update, and Delete (CRUD) operations for the Article model and any accompanying business logic.

### Generate REST resources

Before you can implement the REST API, you will need to generate the REST resources for your model. This can be done quickly using the Nest CLI. Run the following command in your terminal:

```
npx nest generate resource
```

By excuting this command you will see the messages for creating needed files:

```
CREATE src/tests/tests.controller.ts
CREATE src/tests/tests.controller.spec.ts 
CREATE src/tests/tests.module.ts
CREATE src/tests/tests.service.ts 
CREATE src/tests/tests.service.spec.ts
CREATE src/tests/dto/create-test.dto.ts 
CREATE src/tests/dto/update-test.dto.ts
CREATE src/tests/entities/test.entity.ts
UPDATE src/app.module.ts
```

