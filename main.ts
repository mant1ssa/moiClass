import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import { lessonRouter } from './src/lesson/lesson.controller';
import sequelizeConnection from './src/database/index';

const app = express();

app.use(express.json());

app.use('/api/lesson', lessonRouter);

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error(err.stack);
//     res.status(500).send('Something wrong')
// })

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})

sequelizeConnection.sync()
    .then(() => console.log('Connection is okk'))
    .catch((err) => console.error('DB connection error: ', err))