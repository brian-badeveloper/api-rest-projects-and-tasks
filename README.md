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
    cd api-rest-express-typeorm/
    npm install
    ```
2.  **Run Project.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd api-rest-express-typeorm/
    # run project in localhost:3000
    npm run dev
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd api-rest-express-typeorm/
    npm run build
    npm run start
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:3000!

    Edit `src/index.ts` to see your site update in real-time!

4.  **Learn more**

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
  > - env.example
  > - .eslintrc.config.mjs
  > - .gitignore
  > - package.json
  > - README.md
  > - tsconfig.json
  ```
