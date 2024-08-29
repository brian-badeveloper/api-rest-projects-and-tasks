<p align="center">
  <a href="https://typeorm.io/">
    <img alt="TypeORM" src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png" width="60" />
  </a>
  <a href="https://expressjs.com">
    <img alt="Express" src="https://avatars.githubusercontent.com/u/5658226?s=60&v=4" width="30" />
  </a>
  <a href="https://www.typescriptlang.org">
    <img alt="Express" src="https://www.typescriptlang.org/favicon-32x32.png" width="30" />
  </a>
</p>
<h1 align="center">
  API REST with TypeORM, TypeScript, Express and node v18 
</h1>

### Install

  ```shell
  # install
  npm install
  ```

### Scripts:
- `npm install` to install all dependencies
- `npm install --force` to force install all dependencies
- `npm run dev` for development mode and start with the creation of a new universe
- `npm run start` for production mode and start with the creation of a new universe
- `npm run build` to make the build of vendor and project

## Environment variables
To expose a variable in the server.

> ### Note:
> - Never put variables in `.env.example`
> - To assign variables, you must add the `.env` file and add all the variables you want to use in the project

## 🚀 Quick start

1.  **Clone the Project**

    Clone the project and install the dependencies, check the versions of the technologies and make sure you use the correct node version..

    ```shell
    # clone the project
    git clone URL_SSH_PROJECT OR URL_HTTPS_PROJECT
    cd api-rest-projects-and-tasks/
    npm install
    ```
2.  **Setting environment variables**

    You must create the .env file and set the environment variables to allow connecting to the database.

    ```shell
      host="" // string - Database Host
      port="" // number - Database Port
      user="" // string - Database user
      password="" // string - Database password
      database="" // stromg - Database name
      synchronize="" // boolean - enable database synchronization 
      NODE_ENV="" // development | production
    ```
    Note 1: you must create the database, then use the credentials in the .env file to connect it, then you must enable the synchronize field to true for the TypeORM to create all the tables in the database.
    
    Note 2: after having configured the .env file with the environment variables, run the command npm run dev for development or npm run build && npm run start for production and the project will be synchronized with the database.
    
4.  **Run Project.**

    Navigate into your new site’s directory and start it up. 

    ```shell
    cd api-rest-projects-and-tasks/
    # run project in localhost:3000
    npm run dev
    ```

5.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd api-rest-projects-and-tasks/
    npm run build
    npm run start
    ```

6.  **Open the code and start customizing!**

    Your site is now running at http://localhost:3000!

    Edit `src/index.ts` to see your site update in real-time!

7.  **Learn more**

    - [Express Docs](https://expressjs.com/es/guide/routing.html)
    - [TypeORM Docs](https://typeorm.io/)
    - [TypeScript Docs](https://www.typescriptlang.org/)

## 🚀 Folder Architecture
  ```shell
  > - build/
  > - src/
  >   - config/
  >     - config.ts
  >   - controllers/
  >     - cursosController.ts
  >     - estudiantesController.ts
  >     - profesoresController.ts
  >   - db/
  >     - api_rest_express.sql
  >     - conexion.ts
  >   - models/
  >     - cursoModel.ts
  >     - estudianteModel.ts
  >     - profesorModel.ts
  >   - routes/
  >     - cursosRoutes.ts
  >     - estudiantesRoutes.ts
  >     - profesoresRoutes.ts
  >   - app.ts
  >   - index.ts
  > - tools/
  >   - api_rest_projects_and_tasks.sql
  >   - thunder-collection_api-rest-projects-and-tasks.json
  > - env.example
  > - .eslintrc.config.mjs
  > - .gitignore
  > - package.json
  > - README.md
  > - tsconfig.json
  ```
