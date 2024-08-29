import 'module-alias/register'
import app from './app'
import {AppDataSource} from '@/db/conexion'

/**
 * initialize the application
 * 
 */

async function main() {
  try {
    await AppDataSource?.initialize()
    .then(() => console.log('database connected'))
    .catch((error) => console.log(error.message))

    app.listen(3000, () => {
      console.log("server run")
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

main()
