import { Sequelize, DataTypes } from 'sequelize';
import connection from './config';

// Данные подключения
const { database, user, password, host } = connection;

// Создание экземпляра Sequelize
const sequelize = new Sequelize(database, user, password, {
  host,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
});

// Проверка подключения к базе данных
sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;
