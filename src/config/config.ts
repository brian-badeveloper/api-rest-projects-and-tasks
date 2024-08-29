import { config } from 'dotenv'

config()

export default {
  NODE_ENV : process.env.NODE_ENV || 'development',
  HOST: process.env.host || "",
  PORT: process.env.port ? Number(process.env.port) : 3306,
  DATABASE: process.env.database || "",
  USERNAME: process.env.user || "",
  PASSWORD: process.env.password || "",
  SYNCHRONIZE: process.env.synchronize ? Boolean(process.env.synchronize) : false,
};