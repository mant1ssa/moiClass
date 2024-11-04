import express from 'express'
import 'dotenv/config'
import { lessonRouter } from './src/lesson/lesson.controller';
import sequelize from './src/database/index';

const app = express();

app.use(express.json());

app.use('/api/lesson', lessonRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})

sequelize.sync()
    .then(() => console.log('Connection is okk'))
    .catch((err) => console.error('DB connection error: ', err))