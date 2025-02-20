import { Dialect } from 'sequelize'
import { SequelizeOptions } from 'sequelize-typescript'
import 'dotenv/config'

const config: SequelizeOptions = {
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  dialect: 'postgres',
}

export = config
