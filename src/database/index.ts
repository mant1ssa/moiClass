import { Dialect, Sequelize } from 'sequelize';
import connection from './config';

const { database, user, password, host } = connection;

const sequelizeConnection = new Sequelize(database, user, password, {
	host,
    port: 5433,
	dialect: 'postgres',
});

// Проверка подключения к базе данных
sequelizeConnection.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelizeConnection;